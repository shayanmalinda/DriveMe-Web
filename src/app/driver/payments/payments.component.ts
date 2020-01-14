import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
//import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';



export interface payment{ //Interface for payments
  //name: string;
  date: string;
  driverId: string;
  driverPaymentId: string;
  isAccepted: boolean;
  value: string;
}

export interface passenger{ //Interface for Passenger
  address: string;
  driverId: string;
  email: string;
  name: string;
  phone: string;
  pickupLocation: string;
  tempDriverId:string;
  passengerId: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  paymentForm = this.formBuilder.group({
    passengerId: [''],
    date: [''],
    amount: ['']
  });

  allPassengerList: passenger[]; //full array of passengers
  showingPassengerList: passenger[] = [] as passenger[] ; //display array

  
  waiting = false;

  payment: payment;

  //temps
  tempid: string;

  //passenger Parts
  passengerId : string;
  passenger: Observable<passenger>;
  passengerList: passenger []; 

  //private paymentDoc: AngularFirestoreDocument<payment>;
  payments: Observable<payment>;


  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
   // private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    //private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService)
   {
      //this.spinner.show();
   }

  ngOnInit() 
  {
    
    this.afs.collection('users/user/passenger').snapshotChanges().subscribe( array =>
      {

      this.allPassengerList = array.map( item =>{ //adding passenger's data and Id to one
        return {
          passengerId: item.payload.doc.id,
          ...item.payload.doc.data()
        } as passenger ;
      });
      
      this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.showingPassengerList.push(element);
        }
      })
      

    });

  }

  registerpayment(formData)
  {
    this.waiting=true;
    
     this.tempid=this.afs.createId();//create a id for driverPaymentId


    this.payment={
      date: formData.date,
      value: formData.amount,
      driverId: localStorage.getItem('driverId'),
      driverPaymentId: this.tempid,
      isAccepted: false
    }

    this.afs.collection('users/user/passenger/'+formData.passengerId+'/payments/').add(this.payment).then(_=>{
      this.openSnackBar("Payment Details Added", "Done");
      this.waiting=false;
    })

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

