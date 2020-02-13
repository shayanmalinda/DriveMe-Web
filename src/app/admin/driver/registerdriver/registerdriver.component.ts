import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatCheckbox, MatSnackBar, MatStepperPrevious, MatStepper } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSpinner } from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  imgURL: string;
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
  
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

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
    
    if(this.file){
      if(this.pass1==this.pass2 && !this.emailFormControl.hasError('email') && !this.ctrl2.invalid && !this.ctrl4.invalid && !this.ctrl6.invalid){
        stepper.next();
        this.passwordDiv = false;
      }
      else{
        this.passwordDiv = true;
      }
    }
    else{
      this.openSnackBar("Please Upload Profile Image","Done");
    }
  }

  stepperNext2(stepper: MatStepper){
    stepper.next()
  }

  photoUpload(event: any){
    this.file = event.target.files[0];
  }


  registerDriver(){
    this.waiting = true;

    let id = this.afs.createId();

    this.userCredentials={
      email: this.driverEmail,
      password: this.pass1,
      driverId: id
    }

    this.ref = this.afStorage.ref("driverImages/"+id);
    this.task = this.ref.put(this.file);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => (      

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
            imgURL: url,
          },
    
          

          this.afs.doc('users/user/driver/'+id).set(this.driver).then(_ => {
            this.afs.collection('userCredentials').add(this.userCredentials).then(_ => {
              this.openSnackBar("Driver Registered","Done");
              this.waiting = false;
            });
            }
          )      
        ));
      })
    )
    .subscribe();
    }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}