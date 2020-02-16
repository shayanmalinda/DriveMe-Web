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
  rating: string;
  stars: number;
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
  selector: 'app-rate-child',
  templateUrl: './rate-child.component.html',
  styleUrls: ['./rate-child.component.scss']
})
export class RateChildComponent implements OnInit {

  ratingForm=this.formBuilder.group({
    date: [''],
    //passengerId: [''],
    stars: [''],
    rating:['']
  });

  waiting= false;

  


  rating: rating;

  //temps
  //tempid: string;

  parentId: string;
  parent: Observable<parent>;

  //rating: Observable<rating>;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService)
     {   }

  ngOnInit()
 {
   this.route.queryParams.subscribe(params=> {
   this.parentId = params['parentId'];
   });
  }

  registerrating(formData)
  {
    this.waiting=true;
    //this.tempid=this.afs.createId(); 

     //Date changing format to 'YYYY/MM/DD'

    //console.log(formData.date);

    var stringdate=formData.date.toString();
    //console.log(stringdate);

    const datearray=stringdate.split(' ');
   // console.log(datearray);

    // Month conversion
    var month :string;
    if(datearray[1]=='Jan')
    {
      month='01';
    }
    else if(datearray[1]=='Feb')
    {
      month='02';
    }
    else if(datearray[1]=='Mar')
    {
      month='03';
    }
    else if(datearray[1]=='Apr')
    {
      month='04';
    }
    else if(datearray[1]=='May')
    {
      month='05';
    }
    else if(datearray[1]=='Jun')
    {
      month='06';
    }
    else if(datearray[1]=='Jul')
    {
      month='07';
    }
    else if(datearray[1]=='Aug')
    {
      month='08';
    }
    else if(datearray[1]=='Sep')
    {
      month='09';
    }
    else if(datearray[1]=='Oct')
    {
      month='10';
    }
    else if(datearray[1]=='Nov')
    {
      month='11';
    }
    else{
      month='12';
    }


   // console.log("month",month);
    const day=Number(datearray[2]);
    console.log("day",datearray[2]);

    const year=Number(datearray[3]);
    //console.log("year",datearray[3]);

    const dateConverted=year+" / "+month+" / "+day;

    this.rating={ //Obtaining Form data for Rating...
      date: dateConverted,
      stars:+formData.stars,//type casting
      rating: formData.rating
    }

   // console.log(this.passengerId)

    this.afs.collection('users/user/parent/'+this.parentId+ '/ratings/').add(this.rating).then(_=>{
      this.openSnackBar("Rating Details Added", "Done");
      this.waiting=false;
    })
  }

  openSnackBar(message: string, action: string)//snackbar
{
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}
