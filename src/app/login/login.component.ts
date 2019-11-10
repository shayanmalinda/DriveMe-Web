import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { map } from 'rxjs/operators';
import { User } from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';


export interface DialogData {
  characterName: string;
}

export interface user{
  email: string;
  password: string;
}

export interface userCredentials { 
  email: string;
  password: string;
  driverId: string;
  ownerId: string;
  adminId: string;
  passengerId: string;
  parentId: string;
} 

export interface Passenger { 
  email: string;
  password: string;
}  
export interface Driver { 
  email: string;
  password: string;
}  
export interface Admin { 
  email: string;
  password: string;
}  
export interface Parent { 
  parentemail: string;
  parentpass: string;
} 

export interface Owner {
  email : string;
  password: string;
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public name: string

  constructor(public dialog: MatDialog,db: AngularFirestore) {
  }

  signuppopup(character): void {

    this.name = character;

    const dialogRef = this.dialog.open(OverviewDialog, {
      width: '400px',
      data: {characterName: this.name},
      backdropClass: 'backdropBackground'    
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  loginpopup(character): void {

    this.name = character;

    const dialogRef = this.dialog.open(OverviewDialog2, {
      width: '400px',
      data: {characterName: this.name},
      backdropClass: 'backdropBackground' 
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit() {
  }

}


@Component({
  selector: 'signup-popup',
  templateUrl: './signup-popup.html',
})

export class OverviewDialog {
  inputEmail = null;
  inputPassword = null;
  inputPassword2 = null;
  waiting = false;
  loginerror = false;
  hide = true;
  hide2 = true;
  passwordDiv = false;
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  user:user;
    
  myControl1 = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
      public dialogRef: MatDialogRef<OverviewDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private afs: AngularFirestore,
      private router: Router,
      public snackbar: MatSnackBar,
      private _snackBar: MatSnackBar,
  ) { 

  }

  onNoClick(): void {  
    this.dialogRef.close();
  }

  signup(){
    // this.myControl3
    this.passwordDiv = true;
    if(this.inputEmail && this.inputPassword && this.inputPassword2){
      if(this.inputPassword==this.inputPassword2 && !this.myControl1.hasError('email')){
        this.waiting = true;
        this.user={
          email: this.inputEmail,
          password: this.inputPassword,
        }
    
        this.afs.collection('userCredentials').add(this.user).then(_ => {
            this.openSnackBar("Registration Success","Done");
            this.waiting = false;
          }
        );
      }
      else{

      }
    }
    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
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

export class OverviewDialog2 {

  inputEmail = null;
  inputPassword = null;
  checked = false;
  waiting = false;
  waiting2 = false;
  loginerror = false;
  hide = true;
  myControl1 = new FormControl();
  myControl2 = new FormControl();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  private loginDoc: AngularFirestoreCollection<userCredentials>;
  users : Observable<userCredentials[]>;
  userId : string;

  constructor(
      public dialogRef: MatDialogRef<OverviewDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private afs: AngularFirestore,
      private router: Router,
      public snackbar: MatSnackBar,
  ) { 
    if(localStorage.getItem('rememberme')!=null){
      this.waiting2 = true;
      this.userId = localStorage.getItem("rememberme");
      let userDoc: AngularFirestoreCollection<userCredentials>
      userDoc = this.afs.collection('userCredentials');
      userDoc.snapshotChanges().pipe(
        map(actions => actions.map(y=>{
          if(y.payload.doc.id==this.userId){
            this.inputEmail = y.payload.doc.data().email;
            this.inputPassword = y.payload.doc.data().password;
            this.waiting2 = false;
          }
          this.waiting2 = false;
        }
        ))
      ).subscribe();
      this.checked = true;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  login():void {
    console.log("login nowww")
    this.loginerror = false;
    this.waiting = true;


    var email = this.myControl1.value;
    var password = this.myControl2.value;
    this.loginDoc = this.afs.collection('userCredentials');
    this.users = this.loginDoc.valueChanges();
    var flag: boolean = false;

    this.loginDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
          this.userId = id;
          localStorage.setItem('userCredentialId',id);
        }
      }
      ))
    ).subscribe();

    this.users.forEach(x=>{
      x.forEach(y=>{
        if(email==y.email && password==y.password){
          if(this.checked){
            localStorage.setItem('rememberme',this.userId);
          }
          else{
            localStorage.removeItem('rememberme');
            this.checked = false;
          }

          this.dialogRef.close();

          // set user Id's
          if(y.adminId){
            localStorage.setItem('adminId',y.adminId)
          }
          if(y.driverId){
            localStorage.setItem('driverId',y.driverId)
          }
          if(y.passengerId){
            localStorage.setItem('passengerId',y.passengerId)
          }
          if(y.parentId){
            localStorage.setItem('parentId',y.parentId)
          }
          if(y.ownerId){       
            localStorage.setItem('ownerId',y.ownerId)
          }

          //navigate to correspoding Component  
          if(y.adminId){
            console.log("admin exist")
            this.router.navigateByUrl('/admin')
          }
          else if(y.driverId){
            console.log("driver exist")
            this.router.navigateByUrl('/driver')
          }
          else if(y.passengerId){
            console.log("passenger exist")
            this.router.navigateByUrl('/passenger')
          }
          else if(y.parentId){
            console.log("parent exist")
            this.router.navigateByUrl('/parent')
          }
          else if(y.ownerId){       
            console.log("owner exist")     
            this.router.navigateByUrl('/owner')
          }
          else{
            console.log("Not Registered to any user")
            this.router.navigateByUrl('/register')
          }
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
