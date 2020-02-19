import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
   // passengerId: [''],
    date: ['',Validators.required],
    amount: ['',Validators.required]
  });

  waiting = false;

  payment: payment;
  payment2: payment2;

  //temps
  tempid: string;

  //passenger 
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

    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId'];  
    });
    

  }
  

  registerpayment(formData)
  {
    this.waiting=true;
    
     this.tempid=this.afs.createId();//create a id for driverPaymentId

     let driverId = localStorage.getItem("driverId");

    //Date changing format to 'YYYY/MM/DD'

    //console.log(formData.date);

    var stringdate=formData.date.toString();
    //console.log(stringdate);

    const datearray=stringdate.split(' ');
   // console.log(datearray);

    // Month conversion
    var month :string;
    if(datearray[1]=='Jan')
    {
      month='01';
    }
    else if(datearray[1]=='Feb')
    {
      month='02';
    }
    else if(datearray[1]=='Mar')
    {
      month='03';
    }
    else if(datearray[1]=='Apr')
    {
      month='04';
    }
    else if(datearray[1]=='May')
    {
      month='05';
    }
    else if(datearray[1]=='Jun')
    {
      month='06';
    }
    else if(datearray[1]=='Jul')
    {
      month='07';
    }
    else if(datearray[1]=='Aug')
    {
      month='08';
    }
    else if(datearray[1]=='Sep')
    {
      month='09';
    }
    else if(datearray[1]=='Oct')
    {
      month='10';
    }
    else if(datearray[1]=='Nov')
    {
      month='11';
    }
    else{
      month='12';
    }


   // console.log("month",month);
    const day=Number(datearray[2]);
    //console.log("day",datearray[2]);

    const year=Number(datearray[3]);
    //console.log("year",datearray[3]);

    const dateConverted=year+" / "+month+" / "+day;

    this.payment={
      date: dateConverted,
      value: formData.amount,
      driverId: localStorage.getItem('driverId'),
      driverPaymentId: this.tempid,
      isAccepted: false
    }

    this.payment2={
      date: dateConverted,
      value: formData.amount,
      isAccepted: false
    }


    this.afs.doc('users/user/driver/'+driverId+'/payments/'+this.passengerId).set({"exist":true})
    this.afs.doc('users/user/driver/'+driverId+'/payments/'+this.passengerId+'/payments/'+this.tempid).set(this.payment2).then(_=>{
      this.afs.collection('users/user/passenger/'+this.passengerId+'/payments/').add(this.payment).then(_=>{
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

  // public hasError(controlName: string, errorName: string)
  // {
  //   return this.paymentForm.controls[controlName].hasError(errorName);
  // }

}

