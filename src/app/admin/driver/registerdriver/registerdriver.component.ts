import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckbox, MatSnackBar, MatStepperPrevious, MatStepper } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSpinner } from '@angular/material';

export interface Vehicle {
  value: string;
}

export interface Driver {
  driverName: string;
  driverEmail: string;
  driverTelephone: string;
  driverAddress: string;
  driverNIC: string;
  driverLicense: string;
  pass1: string;
  vehicleNumber: string;
  vehicleChassis: string;
  availableSeets: string;
  vehicleType: Selection;
  airConditioned: Boolean;
}


@Component({
  selector: 'app-registerdriver',
  templateUrl: './registerdriver.component.html',
  styleUrls: ['./registerdriver.component.scss']
})
export class RegisterdriverComponent implements OnInit {
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
  
  vehicle: Vehicle[] = [
    {value: 'Bus'},
    {value: 'Van'}
  ];

  constructor(private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar) {}

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

      driverName : this.driverName,
      driverEmail : this.driverEmail,
      driverTelephone : this.driverTelephone,
      driverAddress : this.driverAddress,
      driverNIC : this.driverNIC,
      driverLicense : this.driverLicense,
      airConditioned : this.airConditioned,
      availableSeets : this.availableSeets,
      vehicleChassis : this.vehicleChassis,
      vehicleNumber : this.vehicleNumber,
      vehicleType : this.vehicleType,
      pass1 : this.pass1
    }

    this.afs.collection('users/user/driver').add(this.driver).then(_ => {
        this.openSnackBar("Driver Registered","Done");
        this.waiting = false;
      }
    );
    
  }

}
