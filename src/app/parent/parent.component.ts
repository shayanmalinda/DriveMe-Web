import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent  implements OnInit {

  // @ViewChild('search')
 
  multipleCharacter: boolean=false;
  driverAvailable: boolean=false;
  adminAvailable: boolean=false;
  parentAvailable: boolean=false;
  ownerAvailable: boolean=false;

 
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { 
    if(localStorage.getItem("parentId")){



      if(localStorage.getItem("driverId")){
        this.multipleCharacter=true;
        this.driverAvailable = true;
      }
      
      if(localStorage.getItem("adminId")){
        this.multipleCharacter=true;
        this.adminAvailable = true;
      }
      if(localStorage.getItem("passengerId")){
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
}