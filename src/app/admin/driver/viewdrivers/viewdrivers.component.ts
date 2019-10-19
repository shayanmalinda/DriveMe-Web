import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
}


@Component({
  selector: 'app-viewdrivers',
  templateUrl: './viewdrivers.component.html',
  styleUrls: ['./viewdrivers.component.scss']
})
export class ViewdriversComponent implements OnInit {

  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  constructor(
    private afs: AngularFirestore,private router : Router) { 
      this.driverDoc = this.afs.collection<Driver>('users/user/driver');
      this.drivers = this.driverDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as Driver;
          const id = a.payload.doc.id;
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
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editdriverdetails']}}],{queryParams: {driver: JSON.stringify(driver)}})
    // this.router.navigateByUrl('/admin/(adminnavbar:editdriverdetails)',{queryParams:driver});
    console.log("passing value==="+driver.driverNIC);
  }

}
