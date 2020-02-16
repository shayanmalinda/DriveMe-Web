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

export interface payments{ //Interface Payments
  date: string;
  driverId: string;
  driverPaymentId: string;
  isAccepted: boolean;
  value: string;
  id: string;
  paymentId: string;
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
  paymentsObservable: Observable<payments[]>; //observable payments array
  allPaymentListPassenger: payments[]; //full set
  allPayments: payments[] = [] as payments[] ; //full array of Parents

  constructor(//constructor
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    )
     {       this.spinner.show();
     }

  ngOnInit(){
      
    this.route.queryParams.subscribe(params => {
      this.driverId = params['driverId'];    
    });

    this.afs.collection('users/user/driver/'+this.driverId+'/ratings').snapshotChanges().subscribe(array =>
      {
        this.allRatingsList = array.map( item=>{
          const data=item.payload.doc.data() as rating;
          const id = item.payload.doc.id;
          this.spinner.hide()
          return {id,...data};
        })
        if(this.allRatingsList.length==0){
          this.spinner.hide()

          this.openSnackBar("No Ratings","Ok");
        }
      // console.log(this.allPaymentList);
        
    } );

    let userDoc: AngularFirestoreCollection<payments>;
    console.log("driverId="+this.driverId)
    userDoc = this.afs.collection('users/user/driver/'+this.driverId+'/payments');
    userDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        this.afs.collection('users/user/driver/'+this.driverId+'/payments/'+y.payload.doc.id+'/payments').snapshotChanges().subscribe(array =>
          {
    
            this.allPaymentListPassenger = array.map( item=>{
              const data=item.payload.doc.data() as payments;
              const id = item.payload.doc.id;
              console.log("passengerId="+id)
              return {id,...data};
            })

                 
            this.allPaymentListPassenger.forEach(element =>{ //filtering passengers for logged in driver
              console.log(this.allPaymentListPassenger)
              this.allPayments.push(element);
            })
                
          // console.log(this.passenger);
         } )
      }))
    ).subscribe()



;

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  viewRatings(){
    this.isRatings = true;
    if(this.allRatingsList.length==0){
      this.openSnackBar("No Ratings","Ok");

    }
  }

  viewPayments(){
    this.isRatings = false;
    if(this.allPayments.length==0){
      this.openSnackBar("No Payments","Ok");

    }
  }

}
