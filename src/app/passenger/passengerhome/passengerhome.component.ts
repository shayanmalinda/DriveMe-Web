import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Passenger{
  driverId: string;
}

export class location {
  key: string;
  long: string;
  lat: string;
}


export interface Driver {
  name: string;
  vehicleNumber: string;
  vehicleType: string;
  // pickupLocation: string;
}


@Component({
  selector: 'app-passengerhome',
  templateUrl: './passengerhome.component.html',
  styleUrls: ['./passengerhome.component.scss']
})
export class PassengerhomeComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  passengerId : string;
  driverId :string;
  zoom:number = 15;
  address: string;
  private geoCoder;
  public searchElementRef: ElementRef;
  driverName: string;
  vehicleNumber: string;
  vehicleType: string;

  
  locationChosen = true;
  locationList: Observable<any[]>
  locations: any;

  icon = {
    url: './assets/images/user-solid.svg',
    scaledSize: {
        width: 40,
        height: 60
    }
}


  driverDoc: AngularFirestoreDocument<Driver>;
  drivers: Observable<Driver>;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private spinner: NgxSpinnerService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase) {
      let userID: string;
      this.spinner.show();
      userID = localStorage.getItem('passengerId');
      this.passengerId = userID;

      this.afs.doc<Passenger>('users/user/passenger/'+this.passengerId).valueChanges().subscribe(
        res=>{
          this.driverId = res.driverId;

          db.list('Driver/'+this.driverId).snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({key: c.payload.key, lng:c.payload.child('1').val(),lat: c.payload.child('0').val()})
              )
            )
          ).subscribe(c => {
            console.log(c)
            this.locations = c;
            this.zoom = 17;
          });
      
         


          this.driverDoc = this.afs.doc<Driver>('users/user/driver/'+this.driverId);
          this.drivers = this.driverDoc.valueChanges();
    
          
          // this.userCredentialDoc = this.afs.doc<userCredentials>('userCredentials/'+localStorage.getItem('userCredentialId'));
          // this.userCredentials = this.userCredentialDoc.valueChanges();
    
          this.drivers.forEach(a=>{
            
              this.driverName = a.name;
              this.vehicleNumber = a.vehicleNumber;
              this.vehicleType = a.vehicleType;
              this.spinner.hide();
              
              // this.userCredentials.forEach(b=>{
              //   this.adminEmail = b.email
              //   this.pass1 = b.password
              //   this.pass2 = b.password
                
              // });
          });

        }
      );

     }

  ngOnInit() {this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {

        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 50;
      });
    });
  });
}
switchToDriver(){
  this.router.navigateByUrl('/driver')
}

switchToParent(){
  this.router.navigateByUrl('/parent')
}

switchToAdmin(){
  this.router.navigateByUrl('/admin')
}

switchToOwner(){
  this.router.navigateByUrl('/owner')
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

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }


}
