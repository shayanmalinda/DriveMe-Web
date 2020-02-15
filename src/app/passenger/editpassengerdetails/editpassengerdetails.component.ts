import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


export interface Passenger {
  name: string;
  phone: string;
  address: string;
  //nic: string;
}

// export interface userCredentials{
//   email: string;
//   password: string;
// }

@Component({
  selector: 'app-editpassengerdetails',
  templateUrl: './editpassengerdetails.component.html',
  styleUrls: ['./editpassengerdetails.component.scss']
})
export class EditpassengerdetailsComponent implements OnInit {

  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;

  
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  passengerAddress: string;
  //adminNIC: string;
  pass1: string;
  pass2: string;

  passenger: Passenger;
  // user: userCredentials;
  passengerId: string;

  passengerDoc: AngularFirestoreDocument<Passenger>;
  passengers: Observable<Passenger>;
  
  // userCredentialDoc: AngularFirestoreDocument<userCredentials>;
  // userCredentials: Observable<userCredentials>;

  constructor(private _formBuilder: FormBuilder,
              private afs: AngularFirestore,
              private _snackBar: MatSnackBar,
              private afStorage: AngularFireStorage,
              private route: ActivatedRoute,
              private route2: Router,
              private cdRef: ChangeDetectorRef,
              private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
  }
  
    ngAfterViewInit(){
      this.route.queryParams.subscribe(params => {
        this.passengerId = params['passengerId'];
      });

      this.passengerDoc = this.afs.doc<Passenger>('users/user/admin/'+this.passengerId);
      this.passengers = this.passengerDoc.valueChanges();

      
      // this.userCredentialDoc = this.afs.doc<userCredentials>('userCredentials/'+localStorage.getItem('userCredentialId'));
      // this.userCredentials = this.userCredentialDoc.valueChanges();

      this.passengers.forEach(a=>{
        
          this.passengerName = a.name;
          this.passengerPhone = a.phone;
          this.passengerAddress = a.address;
          //this.adminNIC = a.nic;
          this.spinner.hide();
          
          // this.userCredentials.forEach(b=>{
          //   this.adminEmail = b.email
          //   this.pass1 = b.password
          //   this.pass2 = b.password
            
          // });
      });

      
    }
    
  ngOnInit() {

    

    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      ctrl2: ['', Validators.required],
      ctrl3: ['', Validators.required],
      ctrl4: ['', Validators.required],
      //ctrl5: ['', Validators.required],
      // ctrl6: ['', Validators.required],
      // ctrl7: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  stepperNext(stepper : MatStepper){
    stepper.next()
    // if(this.pass1==this.pass2){
    //   stepper.next();
    //   this.passwordDiv = false;
    // }
    // else{
    //   this.passwordDiv = true;
    // }
  }

  registerPassenger(){   
    this.waiting = true;
    this.passenger={
      name : this.passengerName,
      phone : this.passengerPhone,
      address : this.passengerAddress,
      //nic : this.adminNIC,
    }

    // this.user={
    //   email: this.adminEmail,
    //   password: this.pass1
    // }

    this.afs.doc('users/user/admin/'+this.passengerId).update(this.passenger).then(_ => {
        
      this.openSnackBar("Admin Details Updated","Done");
      this.route2.navigate(['/admin', {outlets: {'adminnavbar': ['adminprofile']}}])
      this.waiting = false;
      // this.afs.doc('userCredentials/'+localStorage.getItem("userCredentialId")).update(this.user).then(_ => {
      // });
    });
    
  }


}
