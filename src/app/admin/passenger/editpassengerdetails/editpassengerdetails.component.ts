import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Passenger{
  name: string;
  email: string;
  address: string;
  phone: string;
  // password: string;
}

@Component({
  selector: 'app-editpassengerdetails',
  templateUrl: './editpassengerdetails.component.html',
  styleUrls: ['./editpassengerdetails.component.scss']
})
export class EditpassengerdetailsComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

   ctrl2 = new FormControl('', [
    Validators.required,  
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.pattern("^[0-9]*$"),
  ]);

  ctrl4 = new FormControl('', [
    Validators.required,  
    Validators.maxLength(12),
    Validators.minLength(10),
  ]);

  ctrl5 = new FormControl('', [
    Validators.required,  
    Validators.minLength(6),
  ]);
  
  passengerName: string;
  passengerEmail: string;
  passengerAddress: string;
  passengerPhone: string;
  pass1: string;
  pass2: string;
  passengerId: string;

  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;

  passenger: Passenger;

  private passengerDoc: AngularFirestoreDocument<Passenger>;
  passengers: Observable<Passenger>;

  constructor(
    private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService) { 
      
    this.spinner.show();

  }

  

  ngAfterViewInit(){
    
    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId'];
    });
    this.passengerDoc = this.afs.doc<Passenger>('users/user/passenger/'+this.passengerId);
    this.passengers = this.passengerDoc.valueChanges();
    
    this.passengers.forEach(a=>{
        this.passengerName = a.name;
        this.passengerEmail = a.email;
        this.passengerPhone = a.phone;
        this.passengerAddress = a.address;
        // this.pass1 = a.password;
        // this.pass2 = a.password;
        this.cdRef.detectChanges();
        
        this.spinner.hide();
    });

    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      ctrl2: ['', Validators.required],
      ctrl3: ['', Validators.required],
      ctrl4: ['', Validators.required],
      // ctrl5: ['', Validators.required],
      // ctrl6: ['', Validators.required],
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

  registerPassenger(){   
    this.waiting = true;
    this.passenger={
      name : this.passengerName,
      email : this.passengerEmail,
      phone : this.passengerPhone,
      address : this.passengerAddress,
      // password : this.pass1
    }


    this.afs.doc('users/user/passenger/'+this.passengerId).update(this.passenger).then(_ => {
        this.openSnackBar("Passenger Details Updated","Done");
        this.waiting = false;
      }
    );
    
  }


}
