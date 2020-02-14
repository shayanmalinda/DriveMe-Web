import { Component, OnInit } from '@angular/core';   
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export class location {
  key: string;
  long: string;
  lat: string;
}

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  icon = {
    url: './assets/images/user-solid.svg',
    scaledSize: {
        width: 40,
        height: 60
    }
}

  // locations: AngularFireList<any>
  latitude = 7.8731;
  longitude = 80.7718;
  locationChosen = true;
  locationList: Observable<any[]>
  locations: any;

  constructor(private db: AngularFireDatabase,private router: Router) {
    db.list('Driver').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          // console.log("lat="+c.payload.child('l').val())
          ({key: c.payload.key, lng: c.payload.child('l/1').val(),lat: c.payload.child('l/0').val()})
          // ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(c => {
      this.locations = c;
    });

   }

  ngOnInit() {
  }

  viewDriverDetails(driverId:string){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['driverviewdriverdetails']}}],{queryParams: {driverId: driverId}})
  }

}
