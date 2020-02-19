import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Passenger{
  driverId: string;
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

  driverId : string;
  address: string;
  public searchElementRef: ElementRef;
  driverName: string;
  vehicleNumber: string;
  vehicleType: string;

  driverDoc: AngularFirestoreDocument<Driver>;
  drivers: Observable<Driver>;
  
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase) {
      let userID: string;
      this.spinner.show();
      userID = localStorage.getItem('passengerId');
      this.driverId = userID;

      this.afs.doc<Passenger>('users/user/passenger/'+this.driverId).valueChanges().subscribe(
        res=>{
          this.driverId = res.driverId;

          db.list('Driver/'+this.driverId).snapshotChanges().pipe(
          ).subscribe(c => {
     
          });
      
         


          this.driverDoc = this.afs.doc<Driver>('users/user/driver/'+this.driverId);
          this.drivers = this.driverDoc.valueChanges();
    
          
          // this.userCredentialDoc = this.afs.doc<userCredentials>('userCredentials/'+localStorage.getItem('userCredentialId'));
          // this.userCredentials = this.userCredentialDoc.valueChanges();
    
          this.drivers.forEach(a=>{
            
              this.driverName = a.name;
              this.vehicleNumber = a.vehicleNumber;
              this.vehicleType = a.vehicleType;
              this.spinner.hide();
              
              // this.userCredentials.forEach(b=>{
              //   this.adminEmail = b.email
              //   this.pass1 = b.password
              //   this.pass2 = b.password
                
              // });
          });

        }
      );

     }

switchToDriver(){
  this.router.navigateByUrl('/driver')
}

switchToParent(){
  this.router.navigateByUrl('/parent')
}

switchToAdmin(){
  this.router.navigateByUrl('/admin')
}

switchToOwner(){
  this.router.navigateByUrl('/owner')
}

logout(){
  // this.spinner.show()
  // setTimeout(function(){
  //   this.spinner.hide()
  // },2000)
  localStorage.clear();
  this.router.navigate([''], { replaceUrl: true });
  // setTimeout
}
ngOnInit() {
}
}
