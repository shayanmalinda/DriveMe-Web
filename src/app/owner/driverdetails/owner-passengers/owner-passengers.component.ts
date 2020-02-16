import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';


export interface passenger{
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
export interface userCredential{
  email: string;
  password: string;
  passengerId: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-owner-passengers',
  templateUrl: './owner-passengers.component.html',
  styleUrls: ['./owner-passengers.component.scss']
})
export class OwnerPassengersComponent implements OnInit {
  // private passengerDoc: AngularFirestoreCollection<passenger>; //Firestore collection of Passengers
 
  // For Normal Passengers [interface-passenger]
  private usersDoc: AngularFirestoreCollection<userCredential>; 
  private passengerDriverId: string;

   passengersObservable: Observable<passenger[]>; //creating an observable array of passengers
   allPassengerList: passenger[]; //full array of passengers
   showingPassengerList: passenger[] = [] as passenger[] ; //display array
 
   
  
   //For Childs [interface-parent]
   parentsObservable: Observable<parent[]>; //creating an observable array of parents
   allParentList: parent[]; //full array of Parents
   showingParentList: parent[] = [] as parent[]; //display array
 
   constructor(
     private afs: AngularFirestore,
     private router: Router,
     private spinner: NgxSpinnerService,
     private _snackBar: MatSnackBar,)
     { }
 
   ngOnInit() 
   {
     // for showing normal passengers in users/user/passenger
 
     this.afs.collection('users/user/passenger').snapshotChanges().subscribe( array =>
       {
 
       this.allPassengerList = array.map( item =>{ //adding passenger's data and Id to one
         const data = item.payload.doc.data() as passenger;
         const id = item.payload.doc.id;
         return {id,...data};
       });
       
       this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
         if(element.driverId == localStorage.getItem('driverId')){
           this.showingPassengerList.push(element);
         }
       })
       
     });
 
     //for showing child in users/user/parent 
 
     this.afs.collection('users/user/parent').snapshotChanges().subscribe( array =>
       {
 
       this.allParentList = array.map( item =>{ //adding passenger's data and Id to one
         const data = item.payload.doc.data() as parent;
         const id = item.payload.doc.id;
         return {id,...data};
       });
       
       this.allParentList.forEach(element =>{ //filtering parents for logged in driver
         if(element.driverId == localStorage.getItem('driverId')){
           this.showingParentList.push(element);
         }
       })
       
     });
     
   }
 
  
   openSnackBar(message: string, action: string) {
     this._snackBar.open(message, action, {
       duration: 2000,
     });
   }
 
 }
 