import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';

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
  driver:Driver;

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

  routeSub: any;
  
  vehicle: Vehicle[] = [
    {value: 'Bus'},
    {value: 'Van'}
  ];

  constructor(private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute) {
      
    
      this.route.queryParams.subscribe(params => {
        var driverDetails;
        driverDetails = JSON.parse(params['driver']);
        console.log("object==",driverDetails);
        console.log("value==",driverDetails['id']);
    });
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
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

    // this.afs.collection('users/user/driver').add(this.driver).then(_ => {
    //     this.openSnackBar("Driver Registered","Done");
    //     this.waiting = false;
    //   }
    // );
    
  }


}
