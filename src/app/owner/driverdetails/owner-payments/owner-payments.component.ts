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
  allpaymentsList: payments[];
  driverId: string;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(){
    this.route.queryParams.subscribe(params => {
      this.driverId = params['driverId'];
    });

    this.afs.collection('users/user/driver/'+this.driverId+'/owner-payments').snapshotChanges().subscribe(array=>
      {
        this.allpaymentsList=array.map(item=>{
          const data=item.payload.doc.data() as payments;
          const id=item.payload.doc.id;
          return {id,...data};
        })
      });
         
  
  }
  ngOnInit() {
  }

}
