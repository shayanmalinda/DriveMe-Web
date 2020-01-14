import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import {MatTreeModule} from '@angular/material/tree';//tree in display

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
  passengerId: string;
  isDeleted: boolean;
}
 


@Component({
  selector: 'app-viewpayments',
  templateUrl: './viewpayments.component.html',
  styleUrls: ['./viewpayments.component.scss']
})

export class ViewpaymentsComponent implements OnInit {

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
        return {
          passengerId: item.payload.doc.id,
          ...item.payload.doc.data()
        } as passenger ;
      });
      
      this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.filteredPassengerList.push(element);
        }
      })
      

    });

  }

  viewpaymenthistory(passengerId: string , passenger:passenger){
   this.router.navigate(['/driver', {outlets: {'drivernavbar': ['payment-history']}}],{queryParams: {passengerId: passengerId}})

  //   // this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editdriverdetails']}}],{queryParams: {driver: JSON.stringify(driver)}})
  //   // this.router.navigateByUrl('/admin/(adminnavbar:editdriverdetails)',{queryParams:driver});
  //   // console.log("passing value==="+driver.driverNIC);
  }


}
