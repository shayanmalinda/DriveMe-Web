import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Passenger } from 'src/app/login/login.component';

export interface Driver{
  name: string;
  email: string;
  telephone: string;
  ownerId: string;
}
export interface userCredential{
  email: string;
  password: string;
  driverId: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-contactinfo-driver',
  templateUrl: './contactinfo-driver.component.html',
  styleUrls: ['./contactinfo-driver.component.scss']
})
export class ContactinfoDriverComponent implements OnInit {
  driversObservable: Observable<Driver[]>; //creating an observable array of passengers
  alldriverList: Driver[]; //full array of passengers
  showingdriverList: Driver[] = [] as Driver[] ; //display array
  myOwnerId: string = localStorage.getItem('ownerId')
  
  private driverDriverId: string;

  constructor(
    private afs: AngularFirestore,
    private router : Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  ) { 
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
  }

  ngOnInit() {
  }

}
