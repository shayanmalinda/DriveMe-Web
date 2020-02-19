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
  selector: 'app-payment-history-parent',
  templateUrl: './payment-history-parent.component.html',
  styleUrls: ['./payment-history-parent.component.scss']
})
export class PaymentHistoryParentComponent implements OnInit {

  //parent
  parentObservable: Observable<parent[]>;
  allParentList: parent[]; //array of full
  paymentsObservable: Observable<payments[]>;
  allPaymentsParent: payments[];
  parentId: string;
  childName: string;

  constructor(//constructor
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  )
   { 

    //console.log("cccc");
   }


  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => {
      this.parentId = params['parentId'];
      this.childName=params['childName'];  
    });


    //console.log('id',this.parentId)

    this.afs.collection('users/user/parent/'+this.parentId+'/payments').snapshotChanges().subscribe(array =>
      {
        //console.log("hii")
        this.allPaymentsParent = array.map( item=>{
          const data=item.payload.doc.data() as payments;
          const id = item.payload.doc.id;
          return {id,...data};
        })
        //console.log("array="+this.allPaymentsParent.length)
        
        if(this.allPaymentsParent.length==0){ //SnackBar Meesage Box for Showing No Results-Children
          //this.spinner.hide()
  
          this.openSnackBar(" No Payments Available Currently"," Ok ");
        }  
  
      });

      
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }


}
