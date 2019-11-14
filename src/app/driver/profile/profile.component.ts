import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

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
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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


 private driverDoc: AngularFirestoreCollection<Driver>;
 drivers: Observable<Driver[]>;
 driver: Observable<Driver>;
 driverId: string;

 constructor(
   private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
   private _snackBar: MatSnackBar) { 
     let userID: string;
     this.spinner.show();
     userID = localStorage.getItem('driverId');
     this.driverId = userID;
     this.driverNIC = userID;
     this.afs.doc<Driver>('users/user/driver/'+userID).valueChanges().subscribe(
       dri_obj=>{
         this.name = dri_obj.name;
         this.email = dri_obj.email;
         this.driverTelephone= dri_obj.driverTelephone;
         this.driverLicense=dri_obj.driverLicense;
         this.vehicleNumber=dri_obj.vehicleNumber;
         this.vehicleType=dri_obj.vehicleType;
         spinner.hide();
       }
     );  
   }

 ngOnInit() {
   // this.drivers.forEach(x=>{
   //     x.forEach(y=>{
   //       y.payload.id;
   //     });
   // });
 }



 changeDriverPassword(){
  this.router.navigate(['/driver', {outlets: {'drivernavbar': ['changeuserpassword']}}],
  {queryParams: {userId:this.driverId, userType:"driver"}})

}



//change driver password fuction 
 
 openSnackBar(message: string, action: string) {
   this._snackBar.open(message, action, {
     duration: 2000,
   });
 }

}
