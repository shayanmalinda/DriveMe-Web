import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface rating{ //Interface Ratings
  date: string;
  stars: number;
  rating: string;
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

@Component({
  selector: 'app-viewratings-child',
  templateUrl: './viewratings-child.component.html',
  styleUrls: ['./viewratings-child.component.scss']
})
export class ViewratingsChildComponent implements OnInit {

  parentId : string;

  parentObservable: Observable<parent[]>; //an observable array of passengers
  allParentList: parent[]; //full set
  filteredParentList: parent[] = [] as parent[]; 
  
  constructor( //constructor
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  )
  { }

  ngOnInit() 
  {
    this.afs.collection('users/user/parent').snapshotChanges().subscribe( array =>
      {

      this.allParentList = array.map( item =>{ //adding passenger's data and Id to one
      const data = item.payload.doc.data() as parent;
      const id = item.payload.doc.id;
        return {id,...data}  ;
      });

      this.allParentList.forEach(element =>{ //filtering passengers for logged in driver
        if(element.driverId == localStorage.getItem('driverId')){
          this.filteredParentList.push(element);
        }
      })

    });
  }
  viewratings(parentId: string , parent:parent) //function for passing values to recent-ratings page
  {
   this.router.navigate(['/driver', {outlets: {'drivernavbar': ['recent-ratings-child']}}],{queryParams: {parentId: parentId}})
   
  }

  addrating(parentId: string, parent: parent)//function for passing Values to Adding rates
  {
    this.router.navigate(['/driver',{outlets:{'drivernavbar':['driver-ratechild']}}],{queryParams:{parentId:parentId}})
  }


}
