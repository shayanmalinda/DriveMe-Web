import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  
  multipleCharacter: boolean=false;
  adminAvailable: boolean=false;
  passengerAvailable: boolean=false;
  parentAvailable: boolean=false;
  ownerAvailable: boolean=false;

  constructor(
    private router: Router,) {
    if(localStorage.getItem("adminId")){
      this.multipleCharacter=true;
      this.adminAvailable = true;
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

  ngOnInit() {
  }

  switchToAdmin(){
    this.router.navigateByUrl('/admin')
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
