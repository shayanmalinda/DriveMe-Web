import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface rating{//Interface Ratings
  date: string;
  stars: number;
  ratings: string;
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
}


@Component({
  selector: 'app-recent-ratings',
  templateUrl: './recent-ratings.component.html',
  styleUrls: ['./recent-ratings.component.scss']
})
export class RecentRatingsComponent implements OnInit {

  //passenger
  passengerObservable: Observable<passenger[]>;
  allPassengerList: passenger[]; //full array of passengers
  passengerId : string;

  //ratings
  allRatingsList: rating[];

  constructor(//constructor
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    )
     { }

  ngOnInit()
 {
    this.route.queryParams.subscribe(params => {
    this.passengerId = params['passengerId'];    
  });

  this.afs.collection('users/user/passenger/'+this.passengerId+'/ratings').snapshotChanges().subscribe(array =>
    {
      this.allRatingsList = array.map( item=>{
        const data=item.payload.doc.data() as rating;
        const id = item.payload.doc.id;
        return {id,...data};
      })
     // console.log(this.allPaymentList);
      
    } );

 }
 

}
