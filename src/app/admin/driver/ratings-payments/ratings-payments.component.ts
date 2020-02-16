import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface rating{ //Interface for Ratings
  date: string;
  stars: number;
  rating: string;
}

@Component({
  selector: 'app-ratings-payments',
  templateUrl: './ratings-payments.component.html',
  styleUrls: ['./ratings-payments.component.scss']
})
export class RatingsPaymentsComponent implements OnInit {

  isRatings: boolean = true;


  driverId : string;

  //ratings
  allRatingsList: rating[];

  constructor(//constructor
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    )
     { }

  ngOnInit(){
      
    this.route.queryParams.subscribe(params => {
      this.driverId = params['driverId'];    
    });

    this.afs.collection('users/user/driver/'+this.driverId+'/ratings').snapshotChanges().subscribe(array =>
      {
        this.allRatingsList = array.map( item=>{
          const data=item.payload.doc.data() as rating;
          const id = item.payload.doc.id;
          return {id,...data};
        })
      // console.log(this.allPaymentList);
        
      } );

  }
 


  viewRatings(){
    this.isRatings = true;
  }

  viewPayments(){
    this.isRatings = false;
  }

}
