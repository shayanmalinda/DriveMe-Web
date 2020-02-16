import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface rating{ //Interface Ratings
  date: string;
  stars: number;
  rating: string;
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
  selector: 'app-viewratings',
  templateUrl: './viewratings.component.html',
  styleUrls: ['./viewratings.component.scss']
})
export class ViewratingsComponent implements OnInit {

  passengerId : string;

  passengerObservable: Observable<passenger[]>; //an observable array of passengers
  allPassengerList: passenger[]; //full set 
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
        return {id,...data}  ;
      });

      this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.filteredPassengerList.push(element);
        }
      })

    });
  }
  viewratings(passengerId: string , passengerName:string) //function for passing values to recent-ratings page
  {
   this.router.navigate(['/driver', {outlets: {'drivernavbar': ['recent-ratings']}}],{queryParams: {passengerId: passengerId, passengerName: passengerName}})
   
  }

  addrating(passengerId: string, passenger: passenger)//function for passing Values to Adding rates
  {
    this.router.navigate(['/driver',{outlets:{'drivernavbar':['driver-ratepassengers']}}],{queryParams:{passengerId:passengerId}})
  }


}
