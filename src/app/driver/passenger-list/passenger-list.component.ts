import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
//import {} from 'src/app/login/login.component';


export interface Passenger{ //Interface for Passenger
  address: string;
  driverId: string;
  email: string;
  name: string;
  phone: string;
  pickupLocation: string;
  tempDriverId:string;
  passengerId: string;
}

export interface userCredentials { //Interface user Credentials
  email: string;
  adminId: string;
  isDeleted: boolean;
} 


@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  private passengerDoc: AngularFirestoreCollection<Passenger>; //

  passengersObservable: Observable<Passenger[]>; //creating an observable array of passengers
  allPassengerList: Passenger[]; //full array of passengers
  showingPassengerList: Passenger[] = [] as Passenger[] ; //display array

  private usersDoc: AngularFirestoreCollection<userCredentials>; 

  private passengerDriverId: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar)
    {   }

  ngOnInit() 
  {
    this.afs.collection('users/user/passenger').snapshotChanges().subscribe( array =>
      {

      this.allPassengerList = array.map( item =>{ //adding passenger's data and Id to one
        return {
          passengerId: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Passenger ;
      });
      
      this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.showingPassengerList.push(element);
        }
      })

    });

  }


 /*openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }*/

}
