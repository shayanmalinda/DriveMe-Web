import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export interface rating{//Interface for ratings
  date: string;
  ratings: string;
  stars: number;
}

export interface passenger{//Interface for passengers
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

@Component({
  selector: 'app-rate-passengers',
  templateUrl: './rate-passengers.component.html',
  styleUrls: ['./rate-passengers.component.scss']
})
export class RatePassengersComponent implements OnInit {

  ratingForm=this.formBuilder.group({
    date: [''],
    passengerId: [''],
    stars:[''],
    ratings:['']
  });

  allPassengerList: passenger[];//full array of passengers
  showingPassengerList: passenger[] = [] as passenger[]; //display array of passengers

  selectedPassengerId :Selection;
  waiting= false;

  rating: rating;

  //temps
  tempid: string;

  passengerId: string;
  passenger: Observable<passenger>;

  ratings: Observable<rating>;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService)
     {   }

  ngOnInit() 
  {
    this.afs.collection('users/user/passenger').snapshotChanges().subscribe(array=>
      {
        this.allPassengerList=array.map(item=>{//adding passenger's data
          const data = item.payload.doc.data() as passenger;
          const id = item.payload.doc.id;
          return{id,...data};
        });

        this.allPassengerList.forEach(element=>{//filtering passengers
          if(element.driverId==localStorage.getItem('driverId')){
            this.showingPassengerList.push(element);
          }
        })
      });
  }

  registerrating(formData: { date: any; stars: any; ratings: any; passengerId: string; })
  {
    this.waiting=true;
    //this.tempid=this.afs.createId(); 

    this.rating={ //Obtaining Form data for Rating...
      date: formData.date,
      stars: formData.stars,
      ratings: formData.ratings
    }


    this.afs.collection('users/user/passenger/'+formData.passengerId+ '/ratings/').add(this.rating).then(_=>{
      this.openSnackBar("Rating Details Added", "Done");
      this.waiting=false;
    })
  }
  openSnackBar(message: string, action: string)
{
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}


}
