import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
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

export interface payment2{ //Interface for payments
  //name: string;
  date: string;
  isAccepted: boolean;
  value: string;
}

export interface parent{ //Interface for Parent
  childAge: string;
  childName: string;
  childSchool: string;
  childSchoolPhone: string;
  driverId: string;
  parentAddress: string;
  parentEmail: string;
  parentPhone: string;
  pickupLocation: string;
  tempDriverId: string;
}

@Component({
  selector: 'app-payments-parent',
  templateUrl: './payments-parent.component.html',
  styleUrls: ['./payments-parent.component.scss']
})
export class PaymentsParentComponent implements OnInit {

  //formBuilder: any;

  paymentForm = this.formBuilder.group({
    // passengerId: [''],
     date: [''],
     amount: ['']
   });
  
   waiting = false;

  payment: payment;
  payment2: payment2;

  //temps
  tempid: string;

  //passenger 
  parentId : string;
  parent: Observable<parent>;
  parentList: parent []; 

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
    this.route.queryParams.subscribe(params => {
      this.parentId = params['parentId'];  
    });
  }

  registerpayment(formData)
  {
    this.waiting=true;
    
     this.tempid=this.afs.createId();//create a id for driverPaymentId

     let driverId = localStorage.getItem("driverId");

    this.payment={
      date: formData.date,
      value: formData.amount,
      driverId: localStorage.getItem('driverId'),
      driverPaymentId: this.tempid,
      isAccepted: false
    }

    this.payment2={
      date: formData.date,
      value: formData.amount,
      isAccepted: false
    }

    this.afs.doc('users/user/driver/'+driverId+'/payments/'+this.parentId+'/payments/'+this.tempid).set(this.payment2).then(_=>{
      this.afs.collection('users/user/parent/'+this.parentId+'/payments/').add(this.payment).then(_=>{
        this.openSnackBar("Payment Details Added", "Done");
        this.waiting=false;
      })
    })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
