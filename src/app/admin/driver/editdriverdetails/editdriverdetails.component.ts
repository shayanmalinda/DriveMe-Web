import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Vehicle {
  value: string;
}

export interface Driver {
  name: string;
  email: string;
  driverTelephone: string;
  driverAddress: string;
  driverNIC: string;
  driverLicense: string;
  password: string;
  vehicleNumber: string;
  vehicleChassis: string;
  availableSeets: string;
  vehicleType: Selection;
  isAC: Boolean;
}

@Component({
  selector: 'app-editdriverdetails',
  templateUrl: './editdriverdetails.component.html',
  styleUrls: ['./editdriverdetails.component.scss']
})
export class EditdriverdetailsComponent implements OnInit {

  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  driverName: string;
  driverEmail: string;
  driverTelephone: string;
  driverAddress: string;
  driverNIC: string;
  driverLicense: string;
  pass1: string;
  pass2: string;
  vehicleNumber: string;
  vehicleChassis: string;
  availableSeets: string;
  vehicleType: Selection;
  airConditioned: Boolean;
  driverId: string;

  driver: Driver;
  routeSub: any;
  
  vehicle: Vehicle[] = [
    {value: 'Bus'},
    {value: 'Van'}
  ];

  
  private driverDoc: AngularFirestoreDocument<Driver>;
  drivers: Observable<Driver>;

  constructor(private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
    ) {
      
      this.spinner.show();
      
      
    }
  
    ngAfterViewInit(){
      this.route.queryParams.subscribe(params => {
        this.driverId = params['driverId'];
        // var driverDetails;
        // driverDetails = JSON.parse(params['driver']);
      });

      this.driverDoc = this.afs.doc<Driver>('users/user/driver/'+this.driverId);
      this.drivers = this.driverDoc.valueChanges();
      
      this.drivers.forEach(a=>{
        
          this.driverName = a.name;
          this.driverEmail = a.email;
          this.driverTelephone = a.driverTelephone;
          this.driverAddress = a.driverAddress;
          this.driverNIC = a.driverNIC;
          this.driverLicense = a.driverLicense;
          this.pass1 = a.password;
          this.pass2 = a.password;
          this.vehicleNumber = a.vehicleNumber;
          this.vehicleChassis = a.vehicleChassis;
          this.availableSeets = a.availableSeets;
          this.vehicleType = a.vehicleType;
          this.airConditioned = a.isAC;
          this.spinner.hide();
      });
      
    }
    
  ngOnInit() {

    

    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      // ctrl2: ['', Validators.required],
      ctrl3: ['', Validators.required],
      ctrl4: ['', Validators.required],
      ctrl5: ['', Validators.required],
      ctrl6: ['', Validators.required],
      // ctrl7: ['', Validators.required],
      // ctrl8: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      ctrl9: ['', Validators.required],
      ctrl10: ['', Validators.required],
      ctrl11: ['', Validators.required],
      ctrl12: ['', Validators.required],
      ctrl13: ['', Validators.required],  
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  stepperNext(stepper : MatStepper){
    if(this.pass1==this.pass2){
      stepper.next();
      this.passwordDiv = false;
    }
    else{
      this.passwordDiv = true;
    }
  }

  registerDriver(){   
    this.waiting = true;
    this.driver={
      name : this.driverName,
      email : this.driverEmail,
      driverTelephone : this.driverTelephone,
      driverAddress : this.driverAddress,
      driverNIC : this.driverNIC,
      driverLicense : this.driverLicense,
      isAC : this.airConditioned,
      availableSeets : this.availableSeets,
      vehicleChassis : this.vehicleChassis,
      vehicleNumber : this.vehicleNumber,
      vehicleType : this.vehicleType,
      password : this.pass1
    }


    this.afs.doc('users/user/driver/'+this.driverId).update(this.driver).then(_ => {
        this.openSnackBar("Driver Details Updated","Done");
        this.waiting = false;
      }
    );
    
  }


}
