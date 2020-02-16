import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface payments{ //Interface Payments
  date: string;
  driverId: string;
  driverPaymentId: string;
  isAccepted: boolean;
  value: string;
  id: string;
  paymentId: string;
}

export interface passenger{ //Interface for Passenger
  address: string;
  driverId: string;
  email: string;
  name: string;
  phone: string;
  pickupLocation: string;
  tempDriverId:string;
 // passengerId: string;
  isDeleted: boolean;
}
@Component({
  selector: 'app-passengerpendingpayments',
  templateUrl: './passengerpendingpayments.component.html',
  styleUrls: ['./passengerpendingpayments.component.scss']
})

export class PassengerpendingpaymentsComponent implements OnInit {

  passengerObservable: Observable<passenger[]>;
  allPassengerList: passenger[]; //full array of passengers
  passengerId : string;

  //payments for  Normal Passengers
  paymentsObservable: Observable<payments[]>; //observable payments array
  allPaymentListPassenger: payments[]; //full set
  allPayments: payments[] = [] as payments[]

  //pass name case
  passengerName: string;

  constructor(   private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId']; 
      this.passengerName=params['passengerName'] ;
  });

  this.passengerId = localStorage.getItem('passengerId')

  console.log('id',this.passengerId);

  this.afs.collection('users/user/passenger/'+this.passengerId+'/payments').snapshotChanges().subscribe(array =>
    {
      this.allPaymentListPassenger = array.map( item=>{
        const data=item.payload.doc.data() as payments;
        const id = item.payload.doc.id;
        console.log(id+" "+data.isAccepted)
        return {id,...data};
      })

      this.allPaymentListPassenger.forEach(element=>{
        if(!element.isAccepted){

          this.allPayments.push(element);
        }
      })
    // console.log(this.passenger);
       } );

  }

  acceptPayment(paymentId: string){
    
  }
}
