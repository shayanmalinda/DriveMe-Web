import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';


export interface payments{ //Interface Payments
  date: string;
  driverId: string;
  driverPaymentId: string;
  isAccepted: boolean;
  value: string;
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
  selector: 'app-viewpayments-parent',
  templateUrl: './viewpayments-parent.component.html',
  styleUrls: ['./viewpayments-parent.component.scss']
})
export class ViewpaymentsParentComponent implements OnInit {

  //For Parent [interface-parent]
  parentId : string;
  parentObservable: Observable<parent[]>; //an observable array of passengers
  allParentList: parent[]; //full set is assigned to this
  filteredParentList: parent[] = [] as parent[]; //driver's passengers


  constructor( //constructor
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  )
  { }

  ngOnInit() 
  {
    this.afs.collection('users/user/parent').snapshotChanges().subscribe( array =>
      {

      this.allParentList = array.map( item =>{ //adding parent's data and Id to one
      const data = item.payload.doc.data() as parent;
      const id = item.payload.doc.id;
        return {id,...data}  ;
      });
      //console.log(this.passengerId);

      this.allParentList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.filteredParentList.push(element);
        }
      })
      if(this.filteredParentList.length==0){ //SnackBar Meesage Box for Showing No Availabilities for all parents
        //this.spinner.hide()

        this.openSnackBar("No Children Available in Your List"," Ok ");
      }
      //console.log(this.passengerId);

    });
  }

  viewpaymenthistory(parentId: string , childName:string) //function for passing values to viewpaymenthistory page
  {
   this.router.navigate(['/driver', {outlets: {'drivernavbar': ['payment-history-parent']}}],{queryParams: {parentId: parentId,childName: childName }})

  }

  addpayment(parentId: string , parent:parent) //function for passing values to addpayments page
  {
   this.router.navigate(['/driver', {outlets: {'drivernavbar': ['driver-payments-parent']}}],{queryParams: {parentId: parentId}})
   
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }


}
