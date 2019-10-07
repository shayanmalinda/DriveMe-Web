import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Md5 } from "md5-typescript";
import { Router } from '@angular/router'

export interface DialogData {
  characterName: string;
}
export interface Passenger { 
  email: string;
  password: string;
}  
export interface Driver { 
  email: string;
  password: string;
}  
export interface Parent { 
  parentemail: string;
  parentpass: string;
} 



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public name: string

  constructor(public dialog: MatDialog,db: AngularFirestore) {}

  loginpopup(character): void {

    this.name = character;

    const dialogRef = this.dialog.open(OverviewDialog, {
      width: '400px',
      data: {characterName: this.name},
      backdropClass: 'backdropBackground'    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  loginpopup2(character): void {

    this.name = character;

    const dialogRef = this.dialog.open(OverviewDialog2, {
      width: '400px',
      data: {characterName: this.name},
      backdropClass: 'backdropBackground' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'login-popup',
  templateUrl: './login-popup.html',
})

export class OverviewDialog {
  waiting = false;
  loginerror = false;
  hide = true;
  myControl1 = new FormControl();
  myControl2 = new FormControl();
    
  private passengerDoc: AngularFirestoreCollection<Passenger>;
  passengers: Observable<Passenger[]>;

  private parentDoc: AngularFirestoreCollection<Parent>;
  parents: Observable<Parent[]>;
  constructor(
      public dialogRef: MatDialogRef<OverviewDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private afs: AngularFirestore,
      private router: Router,
      public snackbar: MatSnackBar
  ) { }

  onNoClick(): void { 
    this.dialogRef.close();
  }

  login():void {
    
    this.loginerror = false;
    this.waiting = true;
    var email = this.myControl1.value;
    var password = this.myControl2.value;
    if(this.data.characterName=="passenger"){
      this.passengerDoc = this.afs.collection('users/user/passenger');
      this.passengers = this.passengerDoc.valueChanges();
      var flag: boolean = false;
      this.passengers.forEach(x=>{
        x.forEach(y=>{
          if(email==y.email && password==y.password){
            this.dialogRef.close();
            this.router.navigateByUrl('/passenger');
            flag = true;
          }
        })
        if(!flag){
          this.waiting = false;
          this.loginerror = true;
        }
      });
      
    }

    if(this.data.characterName=="parent"){
      this.waiting = true;  
      this.parentDoc = this.afs.collection('users/user/parent');
      this.parents = this.parentDoc.valueChanges();
      var flag: boolean = false;
      this.parents.forEach(x=>{
        x.forEach(y=>{
          if(email==y.parentemail && password==y.parentpass){
            this.dialogRef.close();
            this.router.navigateByUrl('/parent');
            flag = true;
          }
        })
        if(!flag){
          this.waiting = false;
          this.loginerror = true;
        }
      });
      
    }
  }

}


@Component({
  selector: 'login-popup2',
  templateUrl: './login-popup2.html',
})  

export class OverviewDialog2 {

  waiting = false;
  loginerror = false;
  hide = true;
  myControl1 = new FormControl();
  myControl2 = new FormControl();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


    
  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  constructor(
      public dialogRef: MatDialogRef<OverviewDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private afs: AngularFirestore,
      private router: Router,
      public snackbar: MatSnackBar
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  
  login():void {
    this.loginerror = false;
    this.waiting = true;
    var email = this.myControl1.value;
    var password = this.myControl2.value;
    
    if(this.data.characterName=="driver"){
      this.driverDoc = this.afs.collection('users/user/driver');
      this.drivers = this.driverDoc.valueChanges();
      var flag: boolean = false;
      this.drivers.forEach(x=>{
        x.forEach(y=>{
          if(email==y.email && password==y.password){
            this.dialogRef.close();
            this.router.navigateByUrl('/driver');
            flag = true;
          }
        })
        if(!flag){
          this.waiting = false;
          this.loginerror = true;
        }
      });
      
    }

    if(this.data.characterName=="admin"){
      this.driverDoc = this.afs.collection('users/user/admin');
      this.drivers = this.driverDoc.valueChanges();
      var flag: boolean = false;
      this.drivers.forEach(x=>{
        x.forEach(y=>{
          if(email==y.email && password==y.password){
            this.dialogRef.close();
            this.router.navigateByUrl('/admin');
            flag = true;
          }
        })
        if(!flag){
          this.waiting = false;
          this.loginerror = true;
        }
      });
    }
    if(this.data.characterName=="owner"){
      this.dialogRef.close();
      this.router.navigateByUrl('/owner');
    }
  }

}
