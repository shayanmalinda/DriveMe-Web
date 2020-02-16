import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import {Location} from '@angular/common';

export interface Driver{
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
  selector: 'app-driverviewpassengerdetails',
  templateUrl: './driverviewpassengerdetails.component.html',
  styleUrls: ['./driverviewpassengerdetails.component.scss']
})
export class DriverviewpassengerdetailsComponent implements OnInit {
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


  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  driver: Observable<Driver>;
  driverId: string;
  userId: string;

  constructor(
    private afs: AngularFirestore,
    private router : Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private _location: Location
    ) { 
      this.spinner.show();

   }

  ngAfterViewInit(){
    setTimeout(() => {

      this.route.queryParams.subscribe(params => {
        this.userId = params['driverId'];
      });
  
       //  userID = localStorage.getItem('driverId');
       console.log(this.userId);
        this.afs.doc<Driver>('users/user/driver/'+this.userId).valueChanges().subscribe(
          dri_obj=>{
            this.name = dri_obj.name;
            this.email = dri_obj.email;
            this.driverTelephone= dri_obj.driverTelephone;
            this.driverLicense=dri_obj.driverLicense;
            this.vehicleNumber=dri_obj.vehicleNumber;
            this.vehicleType=dri_obj.vehicleType;
            this.imgURL = dri_obj.imgURL;
            console.log(this.imgURL)
            this.spinner.hide();
          }
        );  
    }, 1000);
  }

  ngOnInit() {
    
  }



  goback(){
    // this.router.navigate(['/admin', {outlets: {'adminnavbar': ['adminhome']}}])
    this._location.back();
  }

 
 openSnackBar(message: string, action: string) {
   this._snackBar.open(message, action, {
     duration: 2000,
   });
 }

}
