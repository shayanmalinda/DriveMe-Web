import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  multipleCharacter: boolean=false;
  driverAvailable: boolean=false;
  passengerAvailable: boolean=false;
  parentAvailable: boolean=false;
  ownerAvailable: boolean=false;

  constructor(
    private router: Router,) {

    if(localStorage.getItem("adminId")){

      if(localStorage.getItem("driverId")){
        this.multipleCharacter=true;
        this.driverAvailable = true;
      }
      
      if(localStorage.getItem("passengerId")){
        this.multipleCharacter=true;
        this.passengerAvailable = true;
      }
      if(localStorage.getItem("parentId")){
        this.multipleCharacter=true;
        this.parentAvailable = true;
      }
      if(localStorage.getItem("ownerId")){
        this.multipleCharacter=true;
        this.ownerAvailable = true;
      }
    }  

    else{
      router.navigateByUrl('/')
    }
  }

  ngOnInit() {
  }

  switchToDriver(){
    this.router.navigateByUrl('/driver')
  }

  switchToParent(){
    this.router.navigateByUrl('/parent')
  }

  switchToPassenger(){
    this.router.navigateByUrl('/passenger')
  }

  switchToOwner(){
    this.router.navigateByUrl('/owner')
  }

  logout(){
    
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }
}
