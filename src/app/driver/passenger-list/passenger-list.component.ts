import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { Passenger } from 'src/app/login/login.component';


export interface Passenger{ //interface for Passenger
  name: string;
  email: string;
  address: string;
  phone: string;
  pickupLocation: string;
}

export interface userCredentials { 
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
  private passengerDoc: AngularFirestoreCollection<Passenger>;
  passengers: Observable<Passenger[]>;
  private usersDoc: AngularFirestoreCollection<userCredentials>; 
  
  constructor(private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,)
     { 
       this.spinner.show();
       this.passengerDoc=this.afs.collection<Passenger>('users/user/passenger');

       this.passengers = this.passengerDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as Passenger;
          const id = a.payload.doc.id;
          spinner.hide();
          return {id,...data};
        }))
      );
     }

  ngOnInit() {
      //functions for the passenger-list here
  }

}
