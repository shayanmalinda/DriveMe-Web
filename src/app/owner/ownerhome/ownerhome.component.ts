import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Passenger } from 'src/app/login/login.component';


export interface Driver{
  drivrrId: string;
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
  ownerId: string;
}

export interface userCredential{
  email: string;
  password: string;
  driverId: string;
  isDeleted: boolean;
}

export class location {
  key: string;
  long: string;
  lat: string;
}

@Component({
  selector: 'app-ownerhome',
  templateUrl: './ownerhome.component.html',
  styleUrls: ['./ownerhome.component.scss']
})
export class OwnerhomeComponent implements OnInit {
  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  
  driversObservable: Observable<Driver[]>; //creating an observable array of passengers
  alldriverList: Driver[]; //full array of passengers
  showingdriverList: Driver[] = [] as Driver[] ; //display array
  myOwnerId: string = localStorage.getItem('ownerId')
  
  private driverDriverId: string;
  
  icon = {
    url: './assets/images/user-solid.svg',
    scaledSize: {
        width: 40,
        height: 60
    }
  }
  
  latitude = 7.8731;
  longitude = 80.7718;
  locationChosen = true;
  locationList: Observable<any[]>
  locations: any;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    ) {

      this.spinner.show();
      this.afs.collection('users/user/driver').snapshotChanges().subscribe( array =>
        {
  
        this.alldriverList = array.map( item =>{ //adding driver's data and Id to one
          const data = item.payload.doc.data() as Driver;
          const id = item.payload.doc.id;      
          this.spinner.hide();

          return {id,...data};
        });
        // console.log
        this.alldriverList.forEach(element =>{ //filtering passengers for logged in driver
          if(element.ownerId == this.myOwnerId){
            this.showingdriverList.push(element);
          }
        })
        
      });
    db.list('Driver').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          // console.log("lat="+c.payload.child('l').val())
          ({key: c.payload.key, lng: c.payload.child('l/1').val(),lat: c.payload.child('l/0').val()})
          // ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(c => {
      this.locations = c;
    });


   }

  ngOnInit() {
  }
  viewDriverDetails(driverId:string){
    this.router.navigate(['/owner', {outlets: {'ownernavbar': ['driverdetails']}}],{queryParams: {driverId: driverId}})
  }

}
