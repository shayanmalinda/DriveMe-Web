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
  selector: 'app-owner-payments',
  templateUrl: './owner-payments.component.html',
  styleUrls: ['./owner-payments.component.scss']
})
export class OwnerPaymentsComponent implements OnInit {
  //passenger
  passengerObservable: Observable<passenger[]>;
  allPassengerList: passenger[]; //full array of passengers
  passengerId : string;
  filteredPassengerList: passenger[] = [] as passenger[]; //driver's passengers

  //payments for  Normal Passengers
  paymentsObservable: Observable<payments[]>; //observable payments array
  allPaymentListPassenger: payments[]; //full set

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(){
    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId'];
    });

    this.afs.collection('users/user/driver/'+this.passengerId+'/payments').snapshotChanges().subscribe(array=>
      {
        this.allPaymentListPassenger=array.map(item=>{
          const data=item.payload.doc.data() as payments;
          const id=item.payload.doc.id;
          return {id,...data};
        })
      });
         
  
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId'];  
    });

    this.afs.collection('users/user/passenger').snapshotChanges().subscribe( array =>
      {

      this.allPassengerList = array.map( item =>{ //adding passenger's data and Id to one
      const data = item.payload.doc.data() as passenger;
      const id = item.payload.doc.id;
        return {id,...data        }  ;
      });
      //console.log(this.passengerId);

      this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.filteredPassengerList.push(element);
        }
      })
      //console.log(this.passengerId);

    });

    //console.log('id',this.passengerId);
    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId'];  
    });

    //console.log('id',this.passengerId);

    this.afs.collection('users/user/passenger/'+this.passengerId+'/payments').snapshotChanges().subscribe(array =>
      {
        this.allPaymentListPassenger = array.map( item=>{
          const data=item.payload.doc.data() as payments;
          const id = item.payload.doc.id;
          return {id,...data};
        })
       // console.log(this.allPaymentList);
        
      } );
    this.afs.collection('users/user/passenger/'+this.passengerId+'/payments').snapshotChanges().subscribe(array =>
      {
        this.allPaymentListPassenger = array.map( item=>{
          const data=item.payload.doc.data() as payments;
          const id = item.payload.doc.id;
          return {id,...data};
        })
       // console.log(this.allPaymentList);
        
      } );
  }

}
