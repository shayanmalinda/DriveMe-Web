import { Component, OnInit } from '@angular/core';   
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import {Location} from '@angular/common';

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
  selector: 'app-viewcheckpoints',
  templateUrl: './viewcheckpoints.component.html',
  styleUrls: ['./viewcheckpoints.component.scss']
})
export class ViewcheckpointsComponent implements OnInit {

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
  userId: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location:Location)
    { 
      
      this.route.queryParams.subscribe(params => {
        this.userId = params['driverId'];
      });
    }

  locationObservable: Observable<location[]>;
  allLocationList: location[];
  showingLocationList: location[]=[] as location[];

  driverId: string;

  ngOnInit() 
  {

    this.afs.collection('users/user/driver/'+this.userId+'/checkpoints').snapshotChanges().subscribe(array=>
   {
    this.allLocationList = array.map( item =>{ //adding passenger's data and Id to one
        const data = item.payload.doc.data() as location;
        const id = item.payload.doc.id;
        return {id,...data};
   });
   console.log(this.allLocationList);
   console.log(this.allLocationList.length)
   if(this.allLocationList.length==0){
     this.location.back();
     setTimeout(()=>{  
      this.openSnackBar("Driver has not Added any Route","Ok");
    }, 500);
   }

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
