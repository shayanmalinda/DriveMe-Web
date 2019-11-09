import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Md5 } from "md5-typescript";
import { Router } from '@angular/router'
import { map } from 'rxjs/operators';

export interface DialogData {
  characterName: string;
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

  loginpopup(character): void {

    this.name = character;

    const dialogRef = this.dialog.open(OverviewDialog, {
      width: '400px',
      data: {characterName: this.name},
      backdropClass: 'backdropBackground'    
    });

    dialogRef.afterClosed().subscribe(result => {
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
  inputEmail = null;
  inputPassword = null;
  checked = false;
  waiting = false;
  waitingadmin = true;
  waitingpassenger = true;
  waitingparent = true;
  waitingdriver = true;
  waitingowner = true;
  loginerror = false;
  hide = true;
  myControl1 = new FormControl();
  myControl2 = new FormControl();
    

  private passengerDoc: AngularFirestoreCollection<Passenger>;
  passengers: Observable<Passenger[]>

  private parentDoc: AngularFirestoreCollection<Parent>;
  parents: Observable<Parent[]>;  
    
  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;

  private adminDoc: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;
  
  private ownerDoc: AngularFirestoreCollection<Owner>;
  owners: Observable<Owner[]>;

  constructor(
      public dialogRef: MatDialogRef<OverviewDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private afs: AngularFirestore,
      private router: Router,
      public snackbar: MatSnackBar,
  ) { 

    localStorage.clear();

    if(localStorage.getItem('email')!=null){
      this.inputEmail = localStorage.getItem('email');
      this.inputPassword = localStorage.getItem('password');
      this.checked = true;
    }
  }

  onNoClick(): void { 
    this.dialogRef.close();
  }

  passengerLogin(){
    var email = this.myControl1.value;
    var password = this.myControl2.value;
    this.passengerDoc = this.afs.collection('users/user/passenger');
    this.passengers = this.passengerDoc.valueChanges();
    this.passengerDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
          localStorage.setItem('passengerId',id);
        }
      }
      ))
    ).subscribe();
    
    var flag: boolean = false;
    this.passengers.forEach(x=>{
      x.forEach(y=>{
        if(email==y.email && password==y.password){
          if(this.checked){
            localStorage.setItem('email',email);
            localStorage.setItem('password',password);
          }
          else{
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            this.checked = false;
          }
          this.dialogRef.close();
          // this.router.navigateByUrl('/passenger');
          flag = true;
        }
      })
      if(!flag){
        this.waitingpassenger = false;
        this.loginerror = true;
      }
    });
  }

  parentLogin(){
    var email = this.myControl1.value;
    var password = this.myControl2.value;
    this.parentDoc = this.afs.collection('users/user/parent');
    this.parentDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        if(email==y.payload.doc.data().parentemail && password==y.payload.doc.data().parentpass){
          localStorage.setItem('parentId',id);
        }
      }
      ))
    ).subscribe();

  
    this.parentDoc = this.afs.collection('users/user/parent');
    this.parents = this.parentDoc.valueChanges();
    var flag: boolean = false;
    this.parents.forEach(x=>{
      x.forEach(y=>{
        if(email==y.parentemail && password==y.parentpass){
          if(this.checked){
            localStorage.setItem('email',email);
            localStorage.setItem('password',password);
          }
          else{
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            this.checked = false;
          }
          this.dialogRef.close();
          // this.router.navigateByUrl('/parent');
          flag = true;
        }
      })
      if(!flag){
        this.waitingparent = false;
        this.loginerror = true;
      }
    });
  }

  adminLogin(){
    var email = this.myControl1.value;
    var password = this.myControl2.value;this.adminDoc = this.afs.collection('users/user/admin');
    this.admins = this.adminDoc.valueChanges();
    var flag: boolean = false;

    

    this.adminDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
          localStorage.setItem('adminId',id);
        }
      }
      ))
    ).subscribe();

    this.admins.forEach(x=>{
      x.forEach(y=>{
        if(email==y.email && password==y.password){
          if(this.checked){
            localStorage.setItem('email',email);
            localStorage.setItem('password',password);
          }
          else{
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            this.checked = false;
          }
          this.dialogRef.close();
          // this.router.navigateByUrl('/admin');
          flag = true;
        }
      })
      if(!flag){
        this.waitingadmin = false;
        this.loginerror = true;
      }
    });

  }

  ownerLogin(){
    
    var email = this.myControl1.value;
    var password = this.myControl2.value;
    this.ownerDoc = this.afs.collection('users/user/owner');
    this.owners = this.driverDoc.valueChanges();
    var flag: boolean = false;

    this.driverDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
          localStorage.setItem('ownerId',id);
        }
      }
      ))
    ).subscribe();

    this.drivers.forEach(x=>{
      x.forEach(y=>{
        if(email==y.email && password==y.password){
          if(this.checked){
            localStorage.setItem('email',email);
            localStorage.setItem('password',password);
          }
          else{
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            this.checked = false;
          }
          this.dialogRef.close();
          // this.router.navigateByUrl('/owner');
          flag = true;
        }
      })
      if(!flag){
        this.waitingowner = false;
        this.loginerror = true;
      }
    });
  }

  driverLogin(){
    var email = this.myControl1.value;
    var password = this.myControl2.value;
    this.driverDoc = this.afs.collection('users/user/driver');
    this.drivers = this.driverDoc.valueChanges();
    var flag: boolean = false;

    this.driverDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
          localStorage.setItem('driverId',id);
        }
      }
      ))
    ).subscribe();

    this.drivers.forEach(x=>{
      x.forEach(y=>{
        if(email==y.email && password==y.password){
          if(this.checked){
            localStorage.setItem('email',email);
            localStorage.setItem('password',password);
          }
          else{
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            this.checked = false;
          }
          this.dialogRef.close();
          this.router.navigateByUrl('/driver');
          flag = true;
        }
      })
      if(!flag){
        this.waitingdriver = false;
        this.loginerror = true;
      }
    });
  }

  login():void {


  }

}






























@Component({
  selector: 'login-popup2',
  templateUrl: './login-popup2.html',
})  

export class OverviewDialog2 {

  inputEmail = null;
  inputPassword = null;
  checked = false;
  waiting = false;
  // waitingadmin = true;
  // waitingpassenger = true;
  // waitingparent = true;
  // waitingdriver = true;
  // waitingowner = true;
  loginerror = false;
  hide = true;
  myControl1 = new FormControl();
  myControl2 = new FormControl();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  // private passengerDoc: AngularFirestoreCollection<Passenger>;
  // passengers: Observable<Passenger[]>

  // private parentDoc: AngularFirestoreCollection<Parent>;
  // parents: Observable<Parent[]>;  
    
  // private driverDoc: AngularFirestoreCollection<Driver>;
  // drivers: Observable<Driver[]>;

  // private adminDoc: AngularFirestoreCollection<Admin>;
  // admins: Observable<Admin[]>;
  
  // private ownerDoc: AngularFirestoreCollection<Owner>;
  // owners: Observable<Owner[]>;

  private loginDoc: AngularFirestoreCollection<userCredentials>;
  users : Observable<userCredentials[]>;


  constructor(
      public dialogRef: MatDialogRef<OverviewDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private afs: AngularFirestore,
      private router: Router,
      public snackbar: MatSnackBar
  ) { 
    if(localStorage.getItem('email')!=null){
      this.inputEmail = localStorage.getItem('email');
      this.inputPassword = localStorage.getItem('password');
      this.checked = true;

      localStorage.clear();
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
          localStorage.setItem('userCredentialId',id);
        }
      }
      ))
    ).subscribe();

    this.users.forEach(x=>{
      x.forEach(y=>{
        if(email==y.email && password==y.password){
          if(this.checked){
            localStorage.setItem('email',email);
            localStorage.setItem('password',password);
          }
          else{
            localStorage.removeItem('email');
            localStorage.removeItem('password');
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
          flag = true;
        }
      })
      if(!flag){
        this.waiting = false;
        this.loginerror = true;
      }
    });

    // this.adminLogin();
    // this.passengerLogin();
    // this.parentLogin();
    // this.driverLogin();
    // this.ownerLogin();

    // this.navigateURL();

    // if(!this.waitingadmin && !this.waitingdriver && !this.waitingpassenger && !this.waitingowner && !this.waitingparent){
    //   this.waiting = false;
    //   console.log("changing waiting")
    // }

    // console.log(this.waiting)
    // if(!this.waiting){

    //   if(localStorage.getItem('adminId')){      
    //     this.router.navigateByUrl('/admin');
    //   }

    //   if(localStorage.getItem('driverId')){      
    //       this.router.navigateByUrl('/driver');
    //   }

    //   if(localStorage.getItem('passengerId')){      
    //       this.router.navigateByUrl('/passenger');
    //   }

    //   if(localStorage.getItem('parentId')){      
    //       this.router.navigateByUrl('/parent');
    //   }

    //   if(localStorage.getItem('ownerId')){      
    //       this.router.navigateByUrl('/owner');
    //   }
    
    // }

  }



  // passengerLogin(){
  //   var email = this.myControl1.value;
  //   var password = this.myControl2.value;
  //   this.passengerDoc = this.afs.collection('users/user/passenger');
  //   this.passengers = this.passengerDoc.valueChanges();
  //   this.passengerDoc.snapshotChanges().pipe(
  //     map(actions => actions.map(y=>{
  //       const id = y.payload.doc.id;
  //       if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
  //         localStorage.setItem('passengerId',id);
  //       }
  //     }
  //     ))
  //   ).subscribe();
    
  //   var flag: boolean = false;
  //   this.passengers.forEach(x=>{
  //     console.log("2 searching passneger")
  //     x.forEach(y=>{
  //       if(email==y.email && password==y.password){
  //         if(this.checked){
  //           localStorage.setItem('email',email);
  //           localStorage.setItem('password',password);
  //         }
  //         else{
  //           localStorage.removeItem('email');
  //           localStorage.removeItem('password');
  //           this.checked = false;
  //         }
  //         this.dialogRef.close();
  //         // this.router.navigateByUrl('/passenger');
  //         console.log("passenger login")
  //         flag = true;
  //       }
  //     })
  //     if(!flag){
  //       this.waitingpassenger = false;
  //       this.loginerror = true;
  //     }
  //   });
  // }

  // parentLogin(){
  //   var email = this.myControl1.value;
  //   var password = this.myControl2.value;
  //   this.parentDoc = this.afs.collection('users/user/parent');
  //   this.parentDoc.snapshotChanges().pipe(
  //     map(actions => actions.map(y=>{
  //       const id = y.payload.doc.id;
  //       if(email==y.payload.doc.data().parentemail && password==y.payload.doc.data().parentpass){
  //         localStorage.setItem('parentId',id);
  //       }
  //     }
  //     ))
  //   ).subscribe();

  //   this.waiting = true;  
  //   this.parentDoc = this.afs.collection('users/user/parent');
  //   this.parents = this.parentDoc.valueChanges();
  //   var flag: boolean = false;
  //   this.parents.forEach(x=>{
  //     console.log("3 searching parent")
  //     x.forEach(y=>{
  //       if(email==y.parentemail && password==y.parentpass){
  //         if(this.checked){
  //           localStorage.setItem('email',email);
  //           localStorage.setItem('password',password);
  //         }
  //         else{
  //           localStorage.removeItem('email');
  //           localStorage.removeItem('password');
  //           this.checked = false;
  //         }
  //         this.dialogRef.close();
  //         // this.router.navigateByUrl('/parent');          
  //         console.log("parent login")
  //         flag = true;
  //       }
  //     })
  //     if(!flag){
  //       this.waitingparent = false;
  //       this.loginerror = true;
  //     }
  //   });
  // }

  // adminLogin(){
  //   var email = this.myControl1.value;
  //   var password = this.myControl2.value;this.adminDoc = this.afs.collection('users/user/admin');
  //   this.admins = this.adminDoc.valueChanges();
  //   var flag: boolean = false;

    

  //   this.adminDoc.snapshotChanges().pipe(
  //     map(actions => actions.map(y=>{
  //       const id = y.payload.doc.id;
  //       if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
  //         localStorage.setItem('adminId',id);
  //       }
  //     }
  //     ))
  //   ).subscribe();

  //   this.admins.forEach(x=>{
  //     console.log("1 searching admin")
  //     x.forEach(y=>{
  //       if(email==y.email && password==y.password){
  //         if(this.checked){
  //           localStorage.setItem('email',email);
  //           localStorage.setItem('password',password);
  //         }
  //         else{
  //           localStorage.removeItem('email');
  //           localStorage.removeItem('password');
  //           this.checked = false;
  //         }
  //         this.dialogRef.close();
  //         // this.router.navigateByUrl('/admin');
  //         console.log("admin login")
  //         flag = true;
  //       }
  //     })
  //     if(!flag){
  //       this.waitingadmin = false;
  //       this.loginerror = true;
  //     }
  //   });

  // }

  // ownerLogin(){
    
  //   var email = this.myControl1.value;
  //   var password = this.myControl2.value;
  //   this.ownerDoc = this.afs.collection('users/user/owner');
  //   this.owners = this.ownerDoc.valueChanges();
  //   var flag: boolean = false;

  //   this.ownerDoc.snapshotChanges().pipe(
  //     map(actions => actions.map(y=>{
  //       const id = y.payload.doc.id;
  //       if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
  //         localStorage.setItem('ownerId',id);
  //       }
  //     }
  //     ))
  //   ).subscribe();

  //   this.owners.forEach(x=>{
  //     console.log("5 searching owner")
  //     x.forEach(y=>{
  //       if(email==y.email && password==y.password){
  //         if(this.checked){
  //           localStorage.setItem('email',email);
  //           localStorage.setItem('password',password);
  //         }
  //         else{
  //           localStorage.removeItem('email');
  //           localStorage.removeItem('password');
  //           this.checked = false;
  //         }
  //         this.dialogRef.close();
  //         // this.router.navigateByUrl('/owner');
  //         console.log("owner login")
  //         flag = true;
  //       }
  //     })
  //     if(!flag){
  //       this.waitingowner = false;
  //       this.loginerror = true;
  //     }
  //   });
  // }

  // driverLogin(){
  //   var email = this.myControl1.value;
  //   var password = this.myControl2.value;
  //   this.driverDoc = this.afs.collection('users/user/driver');
  //   this.drivers = this.driverDoc.valueChanges();
  //   var flag: boolean = false;

  //   this.driverDoc.snapshotChanges().pipe(
  //     map(actions => actions.map(y=>{
  //       const id = y.payload.doc.id;
  //       if(email==y.payload.doc.data().email && password==y.payload.doc.data().password){
  //         localStorage.setItem('driverId',id);
  //       }
  //     }
  //     ))
  //   ).subscribe();

  //   this.drivers.forEach(x=>{
  //     x.forEach(y=>{
  //       console.log("4 searching driversss")
  //       if(email==y.email && password==y.password){
  //         if(this.checked){
  //           localStorage.setItem('email',email);
  //           localStorage.setItem('password',password);
  //         }
  //         else{
  //           localStorage.removeItem('email');
  //           localStorage.removeItem('password');
  //           this.checked = false;
  //         }
  //         this.dialogRef.close();
  //         // this.router.navigateByUrl('/driver');
  //         console.log("driver login")
  //         flag = true;
  //       }
  //     })
  //     if(!flag){
  //       this.waitingdriver = false;
  //       this.loginerror = true;
  //     }
  //   });
  // }

  // navigateURL(){
  //   console.log("finished searching")
  // }
  
  
  
}
