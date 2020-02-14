import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

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

export interface availability{ //Interface for Availability
  availability: boolean;
  exists: boolean;
  name: string;
}

@Component({
  selector: 'app-passenger-availability',
  templateUrl: './passenger-availability.component.html',
  styleUrls: ['./passenger-availability.component.scss']
})
export class PassengerAvailabilityComponent implements OnInit {

  availabilityObservable: Observable<availability[]>; //For Child availability
  availabilityListChild: availability[];
  //showingavailabilityListChild: availability[] = [] as availability[];

  availabilityListPassenger: any; //For Passenger Availability
  showingavailabilityList: availability[] = [] as availability[];

  //ids
  //availabilityId: string;
  driverId:string;

  //date calculation
  
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,)
    { }

  ngOnInit()
 {
    this.driverId=localStorage.getItem('driverId');

    this.afs.collection('users/user/driver/'+this.driverId+'/availability').snapshotChanges().subscribe(array=>
      {
        this.availabilityListPassenger=array.map(item=> {
          const data= item.payload.doc.data() as availability;
          const id= item.payload.doc.id;
            this.afs.collection('users/user/driver/'+this.driverId+'/availability/'+id+'/availability').snapshotChanges().subscribe(array=>
              {
                this.showingavailabilityList=array.map(item2=>
                  {
                    const data2=item2.payload.doc.data() as availability;
                    const id2=item2.payload.doc.id;
                    const intdate = +id2;
                    
                    const temp0=Math.trunc((intdate/10000)); // Date Calculation and Passing...
                    var temp1=Math.trunc((intdate%10000)/100);
                    const temp2=Math.trunc((intdate%100));
                   
                    const temp0tostring=temp0.toString();
                    
                    var temptostring=temp1.toString();
                    
                    if(temp1<10)
                    {
                      temptostring= "0"+temptostring;
                    }
              
                    const temp2tostring=temp2.toString();

                    //console.log(temptostring);
                    //  console.log(temp1tostring);
                    //  console.log(temp2tostring);

                    const date=temp0tostring+"-"+temptostring+"-"+temp2tostring;
                    
                    return {id2:id2,date:date,...data2};
                  })
              })
        });


      })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
