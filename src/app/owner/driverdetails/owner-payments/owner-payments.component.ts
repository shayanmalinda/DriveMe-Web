import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';


export interface payments{ //Interface Payments
  date: string;
  driverId: string;
  driverPaymentId: string;
  isAccepted: boolean;
  value: string;
  id: string;
  paymentId: string;
}

export interface Driver{ //Interface Driver
  name: string;
  email: string;
  driverTelephone: string;
  driverAddress: string;
  driverNIC: string;
  driverLicense: string;
  password: string;
  vehicleNumber: string;
  vehicleChassis: string;
  availableSeets: string;
  vehicleType: Selection;
  isAC: Boolean;
  isDeleted: Boolean;
  imgURL: string;
}


@Component({
  selector: 'app-owner-payments',
  templateUrl: './owner-payments.component.html',
  styleUrls: ['./owner-payments.component.scss']
})
export class OwnerPaymentsComponent implements OnInit {
  isRatings: boolean = true;
  //passenger
  driverObservable: Observable<Driver[]>;
  alldriverList: Driver[]; //full array of passengers
  driverId : string;

  //payments for  Normal Passengers
  paymentsObservable: Observable<payments[]>; //observable payments array
  

  //pass name case
  passengerName: string;

  allpaymentsList: payments[];
  allPayments: payments[] = [] as payments[] ; //full array of Payments
 

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  ) { }
         
  
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.driverId = params['driverId']; 
    });

    let userDoc: AngularFirestoreCollection<payments>;
    console.log("driverId="+this.driverId)
    userDoc = this.afs.collection('users/user/driver/'+this.driverId+'/payments');
    userDoc.snapshotChanges().pipe(
      map(actions => actions.map(y=>{
        this.afs.collection('users/user/driver/'+this.driverId+'/payments/'+y.payload.doc.id+'/payments').snapshotChanges().subscribe(array =>
          {
    
            this.allpaymentsList = array.map( item=>{
              const data=item.payload.doc.data() as payments;
              const id = item.payload.doc.id;
              console.log("driverId="+id)
              return {id,...data};
            })

                 
            this.allpaymentsList.forEach(element =>{ //filtering passengers for logged in driver
              console.log(this.allpaymentsList)
              this.allPayments.push(element);
            })
                
          // console.log(this.passenger);
         } )
      }))
    ).subscribe();

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  viewPayments(){
    this.isRatings = false;
    if(this.allPayments.length==0){
      this.openSnackBar("No Payments","Ok");

    }
  }

}
