import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';


export interface payments{ //Interface Payments
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
  isDeleted: boolean;
  passengerId: string;
}
 


@Component({
  selector: 'app-viewpayments',
  templateUrl: './viewpayments.component.html',
  styleUrls: ['./viewpayments.component.scss']
})

export class ViewpaymentsComponent implements OnInit {

  passengerId : string;

  passengerObservable: Observable<passenger[]>; //an observable array of passengers
  allPassengerList: passenger[]; //full set is assigned to this
  filteredPassengerList: passenger[] = [] as passenger[]; //driver's passengers

  constructor( //constructor
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  )
  { }

  ngOnInit() 
  {
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

  }

  viewpaymenthistory(passengerId: string , passenger:passenger) //function for passing values to viewpaymenthistory page
  {
   this.router.navigate(['/driver', {outlets: {'drivernavbar': ['payment-history']}}],{queryParams: {passengerId: passengerId}})
   
  //  console.log("passsengerId: "+passengerId);
  //  console.log("passenger: "+passenger.name);
  }


}
