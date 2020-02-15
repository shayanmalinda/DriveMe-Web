import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface rating{//Interface Ratings
  date: string;
  stars: number;
  rating: string;
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
  selector: 'app-driver-myratings',
  templateUrl: './driver-myratings.component.html',
  styleUrls: ['./driver-myratings.component.scss']
})

export class DriverMyratingsComponent implements OnInit {

  allRatingList: rating[];
  driverId: string;

  constructor(//constructor
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    )
     { }

  ngOnInit() 
  {
    // this.route.queryParams.subscribe(params=>{
    //   this.driverId=params['driverId'];
    // });

    this.driverId=localStorage.getItem('driverId');

    this.afs.collection('users/user/driver/'+this.driverId+'/ratings').snapshotChanges().subscribe(array=>
      {
        this.allRatingList=array.map(item=>{
          const data=item.payload.doc.data() as rating;
          const id=item.payload.doc.id;
          return {id,...data};
        })
      });
  }

}
