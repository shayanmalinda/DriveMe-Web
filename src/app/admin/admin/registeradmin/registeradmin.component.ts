import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckbox, MatSnackBar, MatStepperPrevious, MatStepper } from '@angular/material';
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
        firstCtrl: ['', Validators.required]
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
