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
  selector: 'app-passengerratingspayments',
  templateUrl: './passengerratingspayments.component.html',
  styleUrls: ['./passengerratingspayments.component.scss']
})
export class PassengerratingspaymentsComponent implements OnInit {

  isRatings: boolean = true;


  passengerId : string;
  parentId: string;

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
     {       
       this.spinner.show();
     }

  ngOnInit(){
      
    this.route.queryParams.subscribe(params => {
      if(params['passengerId']!=null){
        this.passengerId = params['passengerId'];  
      }  
      if(params['parentId']!=null){
        this.parentId = params['parentId'];
      }
    });
    if(this.passengerId!=null){
      this.afs.collection('users/user/passenger/'+this.passengerId+'/ratings').snapshotChanges().subscribe(array =>
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

      

      this.afs.collection('users/user/passenger/'+this.passengerId+'/payments').snapshotChanges().subscribe(array =>
        {
          this.allPayments = array.map( item=>{
            const data=item.payload.doc.data() as payments;
            const id = item.payload.doc.id;
            this.spinner.hide()
            return {id,...data};
          })
        // console.log(this.allPaymentList);
          
      } );
    }

    if(this.parentId!=null){
      this.afs.collection('users/user/parent/'+this.parentId+'/ratings').snapshotChanges().subscribe(array =>
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

      this.afs.collection('users/user/parent/'+this.parentId+'/payments').snapshotChanges().subscribe(array =>
        {
          this.allPayments = array.map( item=>{
            const data=item.payload.doc.data() as payments;
            const id = item.payload.doc.id;           

            this.spinner.hide()
            return {id,...data};
          })
        // console.log(this.allPaymentList);
          
      } );
    }

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
