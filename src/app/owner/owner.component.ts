import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  multipleCharacter: boolean=false;
  driverAvailable: boolean=false;
  passengerAvailable: boolean=false;
  parentAvailable: boolean=false;
  ownerAvailable: boolean=false;

  constructor(
  private router: Router,
  private spinner: NgxSpinnerService,) {
    // this.router.navigate(['/admin', {outlets: {'adminnavbar': ['adminhome']}}])

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
    // this.router.navigate(['/admin', {outlets: {'adminnavbar': ['adminhome']}}])
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
    // this.spinner.show()
    // setTimeout(function(){
    //   this.spinner.hide()
    // },2000)
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
    // setTimeout
  }
  homepage(){
    this.router.navigate(['/owner', {outlets: {'ownernavbar': ['ownerhome']}}])
  }
}
