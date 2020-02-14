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
import {Md5} from 'ts-md5/dist/md5';


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
  isDeleted: boolean;
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
  userId : string;
  checked = false;

  constructor(public dialog: MatDialog,
    db: AngularFirestore,
    private router: Router,
    private afs: AngularFirestore,
    private spinner: NgxSpinnerService) {
      localStorage.removeItem("driverId")
      localStorage.removeItem("ownerId")
      localStorage.removeItem("adminId")
      localStorage.removeItem("passengerId")
      localStorage.removeItem("parentId")

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

    if(localStorage.getItem('rememberme')){
      this.spinner.show()
      if(localStorage.getItem('rememberme')!=null){

        // this.waiting2 = true;
        this.userId = localStorage.getItem("rememberme");
        let userDoc: AngularFirestoreCollection<userCredentials>
        userDoc = this.afs.collection('userCredentials');
        userDoc.snapshotChanges().pipe(
          map(actions => actions.map(y=>{
            if(y.payload.doc.id==this.userId){
              // set user Id's
              if(y.payload.doc.get('adminId')){
                localStorage.setItem('adminId',y.payload.doc.get('adminId'))
              }
              if(y.payload.doc.get('driverId')){
                localStorage.setItem('driverId',y.payload.doc.get('driverId'))
              }
              if(y.payload.doc.get('passengerId')){
                localStorage.setItem('passengerId',y.payload.doc.get('passengerId'))
              }
              if(y.payload.doc.get('parentId')){
                localStorage.setItem('parentId',y.payload.doc.get('parentId'))
              }
              if(y.payload.doc.get('ownerId')){       
                localStorage.setItem('ownerId',y.payload.doc.get('ownerId'))
              }
    
              //navigate to correspoding Component  
              if(y.payload.doc.get('adminId')){
                console.log("admin exist") 
                this.router.navigate(['/admin', {outlets: {'adminnavbar': ['adminhome']}}])
                this.spinner.hide()

              }
              else if(y.payload.doc.get('driverId')){
                console.log("driver exist")
                this.router.navigate(['/driver', {outlets: {'drivernavbar': ['driver-vehicleroute']}}])
                this.spinner.hide()
              }
              else if(y.payload.doc.get('passengerId')){
                console.log("passenger exist")
                this.router.navigateByUrl('/passenger')
                this.spinner.hide()
              }
              else if(y.payload.doc.get('parentId')){
                console.log("parent exist")
                this.router.navigateByUrl('/parent')
                this.spinner.hide()
              }
              else if(y.payload.doc.get('ownerId')){       
                console.log("owner exist")     
                this.router.navigateByUrl('/owner')
                this.spinner.hide()
              }
              else{
                console.log("Not Registered to any user")
                this.router.navigateByUrl('/register')
                this.spinner.hide()
              }
            }
            // this.waiting2 = false;
          }
          ))
        ).subscribe();
        this.checked = true;
      }
    }
    else{

      this.name = character;

      const dialogRef = this.dialog.open(OverviewDialog2, {
        width: '400px',
        data: {characterName: this.name},
        backdropClass: 'backdropBackground' 
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }
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
  users = new Array()
  private usersDoc: AngularFirestoreCollection<userCredentials>;
  // users : Observable<userCredentials[]>;

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
        
    this.usersDoc = this.afs.collection('userCredentials');
    var flag: boolean = false;
    
    this.usersDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        this.users.push(y.payload.doc.data().email)
        
      }))
    ).subscribe();
  }

  onNoClick(): void {  
    this.dialogRef.close();
  }

  signup(){
    this.passwordDiv = true;

    if(this.inputEmail && this.inputPassword && this.inputPassword2){

      if(this.inputPassword==this.inputPassword2 && !this.myControl1.hasError('email')){    
        var hashedPassword = Md5.hashStr(this.inputPassword).toString();

        this.waiting = true;
        this.user={
          email: this.inputEmail,
          password: hashedPassword,
        }

        let userFlag:boolean = false;

        for(let u of this.users){  //Check for user has already registered

          if(this.inputEmail==u){
            this.openSnackBar("Email has been already registered","Ok");
            this.waiting = false;
            userFlag = true;
          }
        }

        if(!userFlag){
          this.afs.collection('userCredentials').add(this.user).then(_ => {
            this.openSnackBar("Registration Success","Done");
            this.waiting = false;
          });
        }

       
      }
      else{
        //Invalid Inputs
      }
    }
    else{
      //Empty Inputs
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
  emptyinputs = false;
  hide = true;
  myControl1 = new FormControl();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  myControl2 = new FormControl('', [
    Validators.required,
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
      
      // this.waiting2 = true;
      // this.userId = localStorage.getItem("rememberme");
      // let userDoc: AngularFirestoreCollection<userCredentials>
      // userDoc = this.afs.collection('userCredentials');
      // userDoc.snapshotChanges().pipe(
      //   map(actions => actions.map(y=>{
      //     if(y.payload.doc.id==this.userId){
      //       // var hashedPassword = Md5.hashStr(this.inputPassword);
      //       this.inputEmail = y.payload.doc.data().email;
      //       this.inputPassword = y.payload.doc.data().password;
      //       this.waiting2 = false;
      //     }
      //     this.waiting2 = false;
      //   }
      //   ))
      // ).subscribe();
      // this.checked = true;
    
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  remembermelogin():void{

  }

  login():void {
    console.log("login nowww")

    this.loginerror = false;
    var email = this.emailFormControl.value;
    var password = this.myControl2.value;
    var hashedPassword = Md5.hashStr(password).toString();

    
    if(email && hashedPassword && !this.emailFormControl.invalid){
      this.emptyinputs = false;
      this.waiting = true;

      this.loginDoc = this.afs.collection('userCredentials');
      this.users = this.loginDoc.valueChanges();
      var flag: boolean = false;
  
      this.loginDoc.snapshotChanges().pipe(
        map(actions => actions.map(y=>{
          const id = y.payload.doc.id;    
          var md5 = new Md5();

          if(email==y.payload.doc.data().email && hashedPassword==y.payload.doc.data().password){
            this.userId = id;
            localStorage.setItem('userCredentialId',id);
          }
        }
        ))
      ).subscribe();
  
      this.users.forEach(x=>{
        x.forEach(y=>{            

          if(email==y.email && hashedPassword==y.password && !y.isDeleted){          
            console.log(email+" "+y.email+" "+" "+y.password+ " "+ hashedPassword)

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
              this.router.navigate(['/admin', {outlets: {'adminnavbar': ['adminhome']}}])

            }
            else if(y.driverId){
              console.log("driver exist")
              this.router.navigate(['/driver', {outlets: {'drivernavbar': ['driver-vehicleroute']}}])
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
        setTimeout(()=>{
          console.log(flag)
          if(!flag){
            this.waiting = false;
            this.loginerror = true;
          }
        },6000);
      });
    }
    else{
      // this.emptyinputs = true;
    }


  }



  
  
}
