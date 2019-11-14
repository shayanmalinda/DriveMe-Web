import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface password{
  password: string;
}

export interface userCredentials{
  password: string;
  adminId: string;
  passengerId: string;
  parentId:string;
  driverId: string;
  ownerId:string;
}

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.scss']
})


export class ChangeUserPasswordComponent implements OnInit {
  
  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  prevPass: string;
  pass1: string;
  pass2: string;

  hide1: boolean = true;
  hide2: boolean = true;
  hide3: boolean = true;

  userId: string;
  userType: string;
  user: userCredentials;
  password: password;
  
  // userCredentialDoc: AngularFirestoreDocument<userCredentials>;
  // userCredentials: Observable<userCredentials>;
  userDoc: AngularFirestoreCollection<userCredentials>;
  users : Observable<userCredentials[]>;

  constructor(private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      ctrl2: ['', Validators.required],
      ctrl3: ['', Validators.required],
    });
  }

  ngAfterViewInit(){
    
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.userType = params['userType'];
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

  changePassword(){
    console.log("function call")
    this.waiting = true;
    this.password={
      password: this.pass1
    }

    this.userDoc = this.afs.collection('userCredentials');
    let flag: boolean = false;
    let msgDisplayed:boolean = false;

    this.userDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        const id = y.payload.doc.id;
        console.log(id)
        const data = y.payload.doc.data();
        if(this.userType=="admin" && data.adminId==this.userId){ //changing password for admin
          console.log(data.password+" "+this.prevPass)  
          if(data.password==this.prevPass){ //if previous password is correct                        
            this.afs.doc('userCredentials/'+id).update(this.password).then(_ => {
              flag= true;
            });
          } 
        }
        
        if(this.userType=="parent" && data.parentId==this.userId){ //changing password for parent
          console.log(data.password+" "+this.prevPass)  
          if(data.password==this.prevPass){ //if previous password is correct                        
            this.afs.doc('userCredentials/'+id).update(this.password).then(_ => {
              flag= true;
            });
          } 
        }

        
        if(this.userType=="passenger" && data.passengerId==this.userId){ //changing password for passenger
          console.log(data.password+" "+this.prevPass)  
          if(data.password==this.prevPass){ //if previous password is correct                        
            this.afs.doc('userCredentials/'+id).update(this.password).then(_ => {
              flag= true;
            });
          } 
        }

        if(this.userType=="driver" && data.driverId==this.userId){ //changing password for driver
          console.log(data.password+" "+this.prevPass)  
          if(data.password==this.prevPass){ //if previous password is correct                        
            this.afs.doc('userCredentials/'+id).update(this.password).then(_ => {
              flag= true;
            });
          } 
        }
        
        if(this.userType=="owner" && data.ownerId==this.userId){ //changing password for owner
          console.log(data.password+" "+this.prevPass)  
          if(data.password==this.prevPass){ //if previous password is correct                        
            this.afs.doc('userCredentials/'+id).update(this.password).then(_ => {
              flag= true;
            });
          } 
        }
        
      }))
    ).subscribe(changes => {
      setTimeout(() => {
        if(!msgDisplayed){
          if(flag){
            console.log("success")
            msgDisplayed = true;
            this.waiting = false;
            this.openSnackBar("Password Changed","Done")
          }
          else{
            console.log("failed")
            msgDisplayed = true;
            this.waiting = false;
            this.openSnackBar("Incorrect Previous Password","Done")
          }

        }
      }, 5000);
      });

  }

}
