import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';


export interface Passenger{
  driverId: string;
}

export interface rating{ //Interface for Ratings
  date: string;
  stars: number;
  rating: string;
}

export interface Driver {
  name: string;
  vehicleNumber: string;
  vehicleType: string;
  // pickupLocation: string;
}


@Component({
  selector: 'app-driverratings',
  templateUrl: './driverratings.component.html',
  styleUrls: ['./driverratings.component.scss']
})

export class DriverratingsComponent implements OnInit {

  passengerId : string;
  driverId: string
  address: string;
  public searchElementRef: ElementRef;
  driverName: string;
  vehicleNumber: string;
  vehicleType: string;
  allRatingsList: rating[];
  flag = 0;
  driverDoc: AngularFirestoreDocument<Driver>;
  drivers: Observable<Driver>;
  
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private _snackBar: MatSnackBar,) {
      let userID: string;
      this.spinner.show();
      userID = localStorage.getItem('passengerId');
      this.passengerId = userID;

      this.afs.doc<Passenger>('users/user/passenger/'+this.passengerId).valueChanges().subscribe(
        res=>{
          this.driverId = res.driverId;

          this.driverDoc = this.afs.doc<Driver>('users/user/driver/'+this.driverId);
          this.drivers = this.driverDoc.valueChanges();
    
          
          // this.userCredentialDoc = this.afs.doc<userCredentials>('userCredentials/'+localStorage.getItem('userCredentialId'));
          // this.userCredentials = this.userCredentialDoc.valueChanges();
    
          this.drivers.forEach(a=>{
            
              this.driverName = a.name;
              this.vehicleNumber = a.vehicleNumber;
              this.vehicleType = a.vehicleType;
              this.spinner.hide();
              
          });

          //allRatingsList = []

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
      

        }
      );

     }

     
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
ngOnInit() {
}
}
