
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

export interface userCredential{
  email: string;
  password: string;
  driverId: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-driverdetails',
  templateUrl: './driverdetails.component.html',
  styleUrls: ['./driverdetails.component.scss']
})
export class DriverdetailsComponent implements OnInit {
  // x: boolean = true;

  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  usersDoc: AngularFirestoreCollection<userCredential>; 
  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      this.spinner.show();
      this.driverDoc = this.afs.collection<Driver>('users/user/driver');
      this.drivers = this.driverDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as Driver;
          const id = a.payload.doc.id;
          spinner.hide();
          return {id,...data};
        }))
      )
    
      
      // this.drivers.forEach(a=>{
      //   a.forEach(b=>{
      //     console.log(b.name);
      //   })
      // })
    }

  ngOnInit() {
    // this.drivers.forEach(x=>{
    //     x.forEach(y=>{
    //       y.payload.id;
    //     });
    // });

    
  }

  changedriverDetails(driverId: string , driver:Driver){
   this.router.navigate(['/admin', {outlets: {'ownernavbar': ['editdriverdetails']}}],{queryParams: {driverId: driverId}})

    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editdriverdetails']}}],{queryParams: {driver: JSON.stringify(driver)}})
    this.router.navigateByUrl('/admin/(adminnavbar:editdriverdetails)',{queryParams:driver});
    console.log("passing value==="+driver.driverNIC);
  }

  removeDriver(driverId: string){
    this.spinner.show();
    
    this.afs.doc('users/user/driver/'+driverId).update({isDeleted:true}).then(_ => {
        
      this.usersDoc = this.afs.collection('userCredentials');
      this.usersDoc.snapshotChanges().pipe(
        map(actions => actions.map(y=>{
          const id = y.payload.doc.id;
          let userCredentialDriverId = y.payload.doc.data().driverId
          if(userCredentialDriverId==driverId){
            this.afs.doc('userCredentials/'+id).update({isDeleted:true}).then(_ => {
              this.openSnackBar("Driver Removed","Done");
              this.spinner.hide()
            }
          );
          }
          
        }
        ))
      ).subscribe();
    });
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //changePassword(driverId: string){
    //this.router.navigate(['/owner', {outlets: {'ownernavbar': ['changeuserpassword']}}],{queryParams: {userId: driverId,userType:"driver"}})
    
  //}

}
