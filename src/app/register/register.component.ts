import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isDriver = false;
  isParent = false;
  isOwner = false;
  isPassenger = false;
  constructor(
    private router: Router,) { 
    if(localStorage.getItem("driverId")){
      this.isDriver = true;
    }
    if(localStorage.getItem("parentId")){
      this.isParent = true;
    }
    if(localStorage.getItem("passengerID")){
      this.isPassenger = true;
    }
    if(localStorage.getItem("ownerId")){
      this.isOwner = true;
    }
  }

  ngOnInit() {
  }

  visitDriveme(){
    console.log("visit driveme")
    this.router.navigateByUrl('/visitdriveme')

  }

}
