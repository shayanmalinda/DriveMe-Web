
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Passenger } from 'src/app/login/login.component';

export interface payments{ //Interface Payments
  date: string;
  driverId: string;
  driverPaymentId: string;
  isAccepted: boolean;
  value: string;
  id: string;
  paymentId: string;
}

export interface passenger{ //Interface for Passenger
  address: string;
  driverId: string;
  email: string;
  name: string;
  phone: string;
  pickupLocation: string;
  tempDriverId:string;
 // passengerId: string;
  isDeleted: boolean;
}
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

@Component({
  selector: 'app-driverdetails',
  templateUrl: './driverdetails.component.html',
  styleUrls: ['./driverdetails.component.scss']
})
export class DriverdetailsComponent implements OnInit {
  // x: boolean = true;
  passengerObservable: Observable<passenger[]>;
  allPassengerList: passenger[]; //full array of passengers
  passengerId : string;

  //payments for  Normal Passengers
  paymentsObservable: Observable<payments[]>; //observable payments array
  allPaymentListPassenger: payments[]; //full set
  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  usersDoc: AngularFirestoreCollection<userCredential>; 

  driversObservable: Observable<Driver[]>; //creating an observable array of passengers
  alldriverList: Driver[]; //full array of passengers
  showingdriverList: Driver[] = [] as Driver[] ; //display array
  myOwnerId: string = localStorage.getItem('ownerId')
  //private usersDoc: AngularFirestoreCollection<userCredentials>; 
  private driverDriverId: string;

  constructor(
    private afs: AngularFirestore,
    private router : Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      this.spinner.show();
      this.afs.collection('users/user/driver').snapshotChanges().subscribe( array =>
        {
  
        this.alldriverList = array.map( item =>{ //adding passenger's data and Id to one
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
    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId'];  
    });

    //console.log('id',this.passengerId);

    this.afs.collection('users/user/passenger/'+this.passengerId+'/owner-payments').snapshotChanges().subscribe(array =>
      {
        this.allPaymentListPassenger = array.map( item=>{
          const data=item.payload.doc.data() as payments;
          const id = item.payload.doc.id;
          return {id,...data};
        })
       // console.log(this.allPaymentList);
        
      } );
    
  }
  removeDriver(driverId: string){
    this.spinner.show();

    // this.afs.collection('users/user/driver').snapshotChanges().subscribe( array =>
    //   {

    //   this.alldriverList = array.map( item =>{ //adding passenger's data and Id to one
    //     const data = item.payload.doc.data() as Driver;
    //     const id = item.payload.doc.id;
    //     return {id,...data};
    //   });
      
    //   this.alldriverList.forEach(element =>{ //filtering passengers for logged in driver
    //     if(element.driverId == localStorage.getItem('driverId')){
    //       this.showingdriverList.push(element);
    //     }
    //   })
      
    // });
    
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

  viewratings(driverId: string , driver:Driver){
    this.router.navigate(['/owner', {outlets: {'ownernavbar': ['owner-ratings']}}],{queryParams: {driverId: driverId}})

    // this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editdriverdetails']}}],{queryParams: {driver: JSON.stringify(driver)}})
    // this.router.navigateByUrl('/admin/(adminnavbar:editdriverdetails)',{queryParams:driver});
    // console.log("passing value==="+driver.driverNIC);
  }
  

  viewpayments(driverId: string,passengerId: string){
    this.route.queryParams.subscribe(params => {
      this.passengerId = params['passengerId'];  
    });

    //console.log('id',this.passengerId);

    this.afs.collection('users/user/passenger/'+this.passengerId+'/owner-payments').snapshotChanges().subscribe(array =>
      {
        this.allPaymentListPassenger = array.map( item=>{
          const data=item.payload.doc.data() as payments;
          const id = item.payload.doc.id;
          return {id,...data};
        })
       // console.log(this.allPaymentList);
        
      } );

  //changePassword(driverId: string){
    //this.router.navigate(['/owner', {outlets: {'ownernavbar': ['changeuserpassword']}}],{queryParams: {userId: driverId,userType:"driver"}})
    
  //}

  }
}
