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


@Component({
  selector: 'app-recent-ratings-child',
  templateUrl: './recent-ratings-child.component.html',
  styleUrls: ['./recent-ratings-child.component.scss']
})
export class RecentRatingsChildComponent implements OnInit {

 //parent
 parentObservable: Observable<parent[]>;
 parentId : string;

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
    this.route.queryParams.subscribe(params=> {
      this.parentId=params['parentId'];
    });

    this.afs.collection('users/user/parent/'+this.parentId+'/ratings').snapshotChanges().subscribe(array =>
      {
        this.allRatingsList = array.map( item=>{
          const data=item.payload.doc.data() as rating;
          const id = item.payload.doc.id;
          //console.log(item.payload.doc.data())
          return {id,...data};
        })
       // console.log(this.allPaymentList);
        
      } );

  }

}
