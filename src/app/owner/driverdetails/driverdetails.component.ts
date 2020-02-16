
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
  passengerId: string;
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
export interface parent{ //Interface for Parent
  childAge: string;
  childName: string;
  childSchool: string;
  childSchoolPhone: string;
  driverId: string;
  parentAddress: string;
  parentEmail: string;
  parentPhone: string;
  pickupLocation: string;
  tempDriverId: string;
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
  
  private usersDoc: AngularFirestoreCollection<userCredential>; 
  private passengerDriverId: string;

   passengersObservable: Observable<passenger[]>; //creating an observable array of passengers
   allPassengerList: passenger[]; //full array of passengers
   showingPassengerList: passenger[] = [] as passenger[] ; //display array
  
   //For Childs [interface-parent]
   parentsObservable: Observable<parent[]>; //creating an observable array of parents
   allParentList: parent[]; //full array of Parents
   showingParentList: parent[] = [] as parent[]; //display array
 
  // x: boolean = true;
  passengerObservable: Observable<passenger[]>;
  passengerId : string;

  //For Passenger [interface-passenger]
  filteredPassengerList: passenger[] = [] as passenger[]; //driver's passengers

  //payments for  Normal Passengers
  paymentsObservable: Observable<payments[]>; //observable payments array
  allPaymentListPassenger: payments[]; //full set
  private driverDoc: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  
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
    this.afs.collection('users/user/parent').snapshotChanges().subscribe( array =>
      {

      this.allParentList = array.map( item =>{ //adding passenger's data and Id to one
        const data = item.payload.doc.data() as parent;
        const id = item.payload.doc.id;
        return {id,...data};
      });
      
      this.allParentList.forEach(element =>{ //filtering parents for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.showingParentList.push(element);
        }
      })
      
    });
    this.afs.collection('users/user/passenger').snapshotChanges().subscribe( array =>
      {

      this.allPassengerList = array.map( item =>{ //adding passenger's data and Id to one
        const data = item.payload.doc.data() as passenger;
        const id = item.payload.doc.id;
        return {id,...data};
      });
      
      this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.showingPassengerList.push(element);
        }
      })
      
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
      this.afs.collection('users/user/passenger').snapshotChanges().subscribe( array =>
        {
  
        this.allPassengerList = array.map( item =>{ //adding passenger's data and Id to one
        const data = item.payload.doc.data() as passenger;
        const id = item.payload.doc.id;
          return {id,...data        }  ;
        });
        //console.log(this.passengerId);
  
        this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
          if(element.driverId == localStorage.getItem('driverId')){
            this.filteredPassengerList.push(element);
          }
        })
        //console.log(this.passengerId);
  
      });
    
  }
  removeDriver(driverId: string){
    this.spinner.show();

    //this.afs.collection('users/user/driver').snapshotChanges().subscribe( array =>
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
  viewpayments(driverId: string , driver:Driver) //function for passing values to viewpaymenthistory page
  {
   this.router.navigate(['/owner', {outlets: {'ownernavbar': ['owner-payments']}}],{queryParams: {driverId: driverId}})
   
  }
  viewpassengers(driverId: string , passenger:passenger, parent:parent){
    this.afs.collection('users/user/passenger').snapshotChanges().subscribe( array =>
      {

      this.allPassengerList = array.map( item =>{ //adding passenger's data and Id to one
        const data = item.payload.doc.data() as passenger;
        const id = item.payload.doc.id;
        return {id,...data};
      });
      
      this.allPassengerList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.showingPassengerList.push(element);
        }
      })
      
    });

    //for showing child in users/user/parent 

    this.afs.collection('users/user/parent').snapshotChanges().subscribe( array =>
      {

      this.allParentList = array.map( item =>{ //adding passenger's data and Id to one
        const data = item.payload.doc.data() as parent;
        const id = item.payload.doc.id;
        return {id,...data};
      });
      
      this.allParentList.forEach(element =>{ //filtering parents for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.showingParentList.push(element);
        }
      })
      
    });
  }

  

  //changePassword(driverId: string){
    //this.router.navigate(['/owner', {outlets: {'ownernavbar': ['changeuserpassword']}}],{queryParams: {userId: driverId,userType:"driver"}})
    
  //}

}
