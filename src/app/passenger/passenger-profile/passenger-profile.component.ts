import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Passenger{
  name: string;
  email: string;
  address: string;
  phone: string;
  nic: string;
  isDeleted: Boolean;
  imgURL: string;
}


Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.scss']
})

export interface userCredential{
  email: string;
}

export class PassengerProfileComponent implements OnInit {

  passengerId: string;
  name: string;
  email: string;
  address: string;
  telephone: string;
  nic: string;
  imgURL : string ;


  constructor(private afs: AngularFirestore, private router : Router, private spinner: NgxSpinnerService) { 
    let userID: string;
    this.spinner.show();
    userID = localStorage.getItem('passengerId');
    this.passengerId = userID;

    //Get admin profile details
    this.afs.doc<Passenger>('users/user/admin/'+this.passengerId).valueChanges().subscribe(
      res=>{
        this.name = res.name;
        this.email = res.email;
        this.address = res.address;
        this.nic = res.nic;
        this.telephone = res.phone;
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


changeAdminDetails(){
  this.router.navigate(['/passenger', {outlets: {'passengernavbar': ['editpassengerdetails']}}],{queryParams: {adminId: this.passengerId}})

}

}
