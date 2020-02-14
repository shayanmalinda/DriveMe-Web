import { Component, OnInit } from '@angular/core';   
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface location{
  isActive: Boolean;
  isEnd: Boolean;
  isStart: Boolean;
  order: number;
  placeId: string;
  placeLat: string;
  placeLng: string;
  placeName: string;
  time: string;
}


@Component({
  selector: 'app-vehicle-route',
  templateUrl: './vehicle-route.component.html',
  styleUrls: ['./vehicle-route.component.scss']
})
export class VehicleRouteComponent implements OnInit {

  icon={
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
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,)
    { }

  locationObservable: Observable<location[]>;
  allLocationList: location[];
  showingLocationList: location[]=[] as location[];

  driverId: string;

  ngOnInit() 
  {
    this.driverId=localStorage.getItem('driverId');

    this.afs.collection('users/user/driver/'+this.driverId+'/checkpoints').snapshotChanges().subscribe(array=>
   {
    this.allLocationList = array.map( item =>{ //adding passenger's data and Id to one
        const data = item.payload.doc.data() as location;
        const id = item.payload.doc.id;
        return {id,...data};
   });

   this.allLocationList.forEach(element =>{ //filtering passengers for logged in driver
    if(element.isActive == true){
      this.showingLocationList.push(element);
    }
  })
  
});

}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}
