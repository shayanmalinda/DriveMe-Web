import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Owner{
  name: string;
  // email: string;
  address: string;
  telephone: string;
  nic: string;
  isDeleted: Boolean;
}
@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  username: string;
  multipleCharacter: boolean=false;
  driverAvailable: boolean=false;
  passengerAvailable: boolean=false;
  parentAvailable: boolean=false;
  ownerAvailable: boolean=false;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(
  private router: Router,
  private spinner: NgxSpinnerService,) {
  
  if(localStorage.getItem("ownerId")){

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
    if(localStorage.getItem("adminId")){
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
  homepage(){
    this.router.navigate(['/owner', {outlets: {'ownernavbar': ['ownerhome']}}])
  }
  generatereport(){
    window.print();
  }

}
