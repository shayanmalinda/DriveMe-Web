import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatCheckbox, MatSnackBar, MatStepperPrevious, MatStepper, } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { MatSpinner } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';

export interface Admin{
  name: string;
  email: string;
  telephone: string;
  address: string;
  nic: string;
  password: string;
}

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.scss']
})
export class RegisteradminComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  admin:Admin;

  adminName: string;
  adminEmail: string;
  adminTelephone: string;
  adminAddress: string;
  adminNIC: string;
  pass1: string;
  pass2: string;


  constructor(private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage) {
    }

    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        ctrl1: ['', Validators.required],
        ctrl2: ['', Validators.required],
        ctrl3: ['', Validators.required],
        ctrl4: ['', Validators.required],
        ctrl5: ['', Validators.required],
        ctrl6: ['', Validators.required],
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
    
    registerAdmin(){
      this.waiting = true;
      this.admin={
        name : this.adminName,
        email : this.adminEmail,
        telephone : this.adminTelephone,
        address : this.adminAddress,
        password : this.pass1,
        nic : this.adminNIC,
      }

      this.afs.collection('users/user/admin').add(this.admin).then(_ => {
          this.openSnackBar("Admin Registered","Done");
          this.waiting = false;
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