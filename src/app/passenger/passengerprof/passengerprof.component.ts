import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Passenger{
  name: string;
  email: string;
  address: string;
  phone: string;
  pickupLocation: string;
  isDeleted: Boolean;
  imgURL: string;
}

export interface userCredential{
  email: string;
}

@Component({
  selector: 'app-passengerprof',
  templateUrl: './passengerprof.component.html',
  styleUrls: ['./passengerprof.component.scss']
})
export class PassengerProfComponent implements OnInit {

  passengerId: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  pickupLocation: string;
  imgURL : string ;

  constructor(private afs: AngularFirestore, private router : Router, private spinner: NgxSpinnerService) { 
    let userID: string;
    this.spinner.show();
    userID = localStorage.getItem('passengerId');
    this.passengerId = userID;

    //Get passenger profile details
    this.afs.doc<Passenger>('users/user/passenger/'+this.passengerId).valueChanges().subscribe(
      res=>{
        this.name = res.name;
        this.email = res.email;
        this.address = res.address;
        this.pickupLocation = res.pickupLocation;
        this.phone = res.phone;
        this.imgURL = res.imgURL
        this.afs.doc<userCredential>('userCredentials/'+localStorage.getItem("userCredentialId")).valueChanges().subscribe(
          res=>{
            this.email = res.email;
            // console.log(res)
            spinner.hide();
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  changePassword(){
    this.router.navigate(['/passenger', {outlets: {'passengernavbar': ['changeuserpassword']}}],{queryParams: {userId: this.passengerId,userType:"passenger"}})
     
}


changePassengerDetails(){
  this.router.navigate(['/passenger', {outlets: {'passengernavbar': ['editpassengerdetails']}}],{queryParams: {passengerId: this.passengerId}})

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

}
