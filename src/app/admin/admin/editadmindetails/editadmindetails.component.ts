import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


export interface Admin {
  name: string;
  email: string;
  telephone: string;
  address: string;
  nic: string;
  password: string;
}

@Component({
  selector: 'app-editadmindetails',
  templateUrl: './editadmindetails.component.html',
  styleUrls: ['./editadmindetails.component.scss']
})
export class EditadmindetailsComponent implements OnInit {

  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;

  
  adminName: string;
  adminEmail: string;
  adminTelephone: string;
  adminAddress: string;
  adminNIC: string;
  pass1: string;
  pass2: string;

  admin: Admin;
  adminId: string;

  adminDoc: AngularFirestoreDocument<Admin>;
  admins: Observable<Admin>;

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
        this.adminId = params['adminId'];
      });

      this.adminDoc = this.afs.doc<Admin>('users/user/admin/'+this.adminId);
      this.admins = this.adminDoc.valueChanges();
      
      this.admins.forEach(a=>{
        
          this.adminName = a.name;
          this.adminEmail = a.email;
          this.adminTelephone = a.telephone;
          this.adminAddress = a.address;
          this.adminNIC = a.nic;
          this.pass1 = a.password;
          this.pass2 = a.password;
          this.spinner.hide();
      });
      
    }
    
  ngOnInit() {

    

    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      ctrl2: ['', Validators.required],
      ctrl3: ['', Validators.required],
      ctrl4: ['', Validators.required],
      ctrl5: ['', Validators.required],
      ctrl6: ['', Validators.required],
      ctrl7: ['', Validators.required],
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
      nic : this.adminNIC,
      password : this.pass1,
    }


    this.afs.doc('users/user/admin/'+this.adminId).update(this.admin).then(_ => {
        this.openSnackBar("Admin Details Updated","Done");
        this.waiting = false;
      }
    );
    
  }


}
