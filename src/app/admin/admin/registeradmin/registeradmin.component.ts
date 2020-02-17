import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatCheckbox, MatSnackBar, MatStepperPrevious, MatStepper, } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';

import { map, finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSpinner } from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';

export interface Admin{
  name: string;
  email: string;
  telephone: string;
  address: string;
  nic: string;
  imgURL: string;
}

export interface UserCredentials{
  email: string;
  password: string;
  adminId: string;
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
  
  
  waiting = false;
  passwordDiv=false;
  hide1 = true;
  hide2 = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  admin:Admin;
  userCredentials: UserCredentials;

  adminName: string;
  adminEmail: string;
  adminTelephone: string;
  adminAddress: string;
  adminNIC: string;
  pass1: string;
  pass2: string;
  file: File;
  private admins: Observable<Admin[]>
  private adminDoc: AngularFirestoreCollection<Admin>

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  
  constructor(private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    ) {
      this.adminDoc = this.afs.collection<Admin>('users/user/admin');
      
      
      this.admins = this.adminDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          var data = a.payload.doc.data() as Admin;
          const id = a.payload.doc.id;      
          return {id,...data}
        }))
      );
  }

  ngOnInit() {
    
    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      ctrl3: ['', Validators.required],
      ctrl6: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  stepperNext(stepper : MatStepper){
    if(this.file){

      if(this.pass1==this.pass2 && !this.emailFormControl.hasError('email') && !this.ctrl2.invalid && !this.ctrl4.invalid && !this.ctrl5.invalid){
        stepper.next();
        this.passwordDiv = false;
      }
      else{
        this.passwordDiv = true;
      }
    }
    else{
      this.openSnackBar("Please Upload a  Profile Image","Done");
    }
  }

  photoUpload(event: any){
    this.file = event.target.files[0];
  }
  
  registerAdmin(){    
    var hashedPassword = Md5.hashStr(this.pass1).toString();

    this.waiting = true;
 
    let id = this.afs.createId();

    this.userCredentials={
      email: this.adminEmail,
      password: hashedPassword,
      adminId: id
    }

    let urlString: string;

    // const metaData = {'contentType':this.file.type};
    // const storageRef: firebase.storage.Reference = firebase.storage().ref("adminImages/"+id);
    
    this.ref = this.afStorage.ref("adminImages/"+id);
    this.task = this.ref.put(this.file);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => (      

          this.admin={
            email: this.adminEmail,
            name : this.adminName,
            telephone : this.adminTelephone,
            address : this.adminAddress,
            nic : this.adminNIC,
            imgURL: url
          },

          this.afs.doc('users/user/admin/'+id).set(this.admin).then(_ => {
            // for(let admin of this.admins){

            // }
              this.afs.collection('userCredentials').add(this.userCredentials).then(_ => {
                this.openSnackBar("Admin Registered","Done");
                this.waiting = false;
              });
            }
          )       
        ));
      })
    )
    .subscribe();


        
  }

  getTelephoneError() {
    return 
      this.emailFormControl.hasError('maxLength(10)') ? 'Invalid Telphone Number' :
      this.emailFormControl.hasError('minLength(10)') ? 'Invalid Telphone Number' : '';
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}