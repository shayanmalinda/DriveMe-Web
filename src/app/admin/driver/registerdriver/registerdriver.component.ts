import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatCheckbox, MatSnackBar, MatStepperPrevious, MatStepper } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSpinner } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import {ErrorStateMatcher} from '@angular/material/core';

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
  vehicleNumber: string;
  vehicleChassis: string;
  availableSeets: string;
  vehicleType: Selection;
  isAC: Boolean;
}

export interface UserCredentials{
  email: string;
  password: string;
  driverId: string;
}

@Component({
  selector: 'app-registerdriver',
  templateUrl: './registerdriver.component.html',
  styleUrls: ['./registerdriver.component.scss']
})




export class RegisterdriverComponent implements OnInit {

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

 ctrl6 = new FormControl('', [
   Validators.required,  
   Validators.minLength(6),
 ]);
  
  matcher = new MyErrorStateMatcher();

  waiting = false;
  passwordDiv=false;
  hide1 = true;
  hide2 = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  driver:Driver;
  userCredentials: UserCredentials;

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
  airConditioned: Boolean = false;
  file: File;
  
  vehicle: Vehicle[] = [
    {value: 'Bus'},
    {value: 'Van'}
  ];

  constructor(private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage) {
    }

  ngOnInit() {   
  
    
    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      ctrl3: ['', Validators.required],
      ctrl5: ['', Validators.required],
      ctrl7: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      ctrl8: ['', Validators.required],
      ctrl9: ['', Validators.required],
      ctrl10: ['', Validators.required],
      ctrl11: ['', Validators.required],
      ctrl12: ['', !Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  stepperNext(stepper : MatStepper){
    if(this.pass1==this.pass2 && !this.emailFormControl.hasError('email') && !this.ctrl2.invalid && !this.ctrl4.invalid && !this.ctrl6.invalid){
      stepper.next();
      this.passwordDiv = false;
    }
    else{
      this.passwordDiv = true;
    }
  }

  stepperNext2(stepper: MatStepper){
    stepper.next()
  }
  photoUpload(event: any){
    this.file = event.target.files;
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
    }

    let id = this.afs.createId();

    this.userCredentials={
      email: this.driverEmail,
      password: this.pass1,
      driverId: id
    }


    // const metaData = {'contentType':this.file.type};
    // const storageRef: firebase.storage.Reference = firebase.storage().ref("driverImages/"+id);
    // storageRef.put(this.file,metaData);
    
    this.afs.collection('users/user/driver').doc(id).set(this.driver).then(_ => {
      this.afs.collection('userCredentials').add(this.userCredentials).then(_ => {
        this.openSnackBar("Driver Registered","Done");
        this.waiting = false;
      });
    }
  );
    
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}