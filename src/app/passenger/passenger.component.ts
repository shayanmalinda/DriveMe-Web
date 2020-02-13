import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent  implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

  // @ViewChild('search')
  public searchElementRef: ElementRef;
 
  multipleCharacter: boolean=false;
  driverAvailable: boolean=false;
  adminAvailable: boolean=false;
  parentAvailable: boolean=false;
  ownerAvailable: boolean=false;

 
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { 
    if(localStorage.getItem("passengerId")){

      if(localStorage.getItem("driverId")){
        this.multipleCharacter=true;
        this.driverAvailable = true;
      }
      
      if(localStorage.getItem("adminId")){
        this.multipleCharacter=true;
        this.adminAvailable = true;
      }
      if(localStorage.getItem("parentId")){
        this.multipleCharacter=true;
        this.parentAvailable = true;
      }
      if(localStorage.getItem("ownerId")){
        this.multipleCharacter=true;
        this.ownerAvailable = true;
      }
      // this.router.navigate(['/admin', {outlets: {'adminnavbar': ['adminhome']}}])
    }  

    else{
      router.navigateByUrl('/')
    }}

 
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
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
          this.zoom = 12;
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
