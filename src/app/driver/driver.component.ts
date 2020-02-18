import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit 
  {

  multipleCharacter: boolean=false;
  adminAvailable: boolean=false;
  passengerAvailable: boolean=false;
  parentAvailable: boolean=false;
  ownerAvailable: boolean=false;

  constructor(private router: Router,) 
  {
      //In case of driver has multiple roles in the system
    if(localStorage.getItem("driverId")) 
    {
        
      if(localStorage.getItem("adminId"))
      {
        this.multipleCharacter=true;
        this.adminAvailable = true;
      }
      
      if(localStorage.getItem("passengerId"))
      {
        this.multipleCharacter=true;
        this.passengerAvailable = true;
      }
      if(localStorage.getItem("parentId"))
      {
        this.multipleCharacter=true;
        this.parentAvailable = true;
      }
      if(localStorage.getItem("ownerId"))
      {
        this.multipleCharacter=true;
        this.ownerAvailable = true;
      }
    } 
    else
    {
      router.navigateByUrl('/')
    }

  }

  ngOnInit() 
  {

  }

  switchToAdmin() //switch driver-> admin
  {
    this.router.navigateByUrl('/admin') 
  }

  switchToParent() //switch driver-> parent
  {
    this.router.navigateByUrl('/parent')
  }

  switchToPassenger() //switch driver-> passenger
  {
    this.router.navigateByUrl('/passenger')
  }

  switchToOwner() //switch driver-> owner
  {
    this.router.navigateByUrl('/owner')
  }

  //Generate Printouts
  generateReport()
  {
    window.print()
  }


  logout() //function to logout from driver 
  {
    
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

  homepage(){
    this.router.navigate(['/driver',{outlets: {'drivernavbar':['driver-vehicleroute']}}])
  }

}
