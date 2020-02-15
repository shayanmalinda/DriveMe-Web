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
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

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
  //this.getData();
}
 /* getData(){
    this.router.getUsers()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
}*/
/*searchUsers(searchValue){
  return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
    .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    .snapshotChanges()
}
getUsers(){
  return this.db.collection('users').snapshotChanges();
}
getUser(userKey){
  return this.db.collection('users').doc(userKey).snapshotChanges();
}*/


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
  /*combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.router.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }
  getData(){
    this.router.getUsers()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }*/
  homepage(){
    this.router.navigate(['/owner', {outlets: {'ownernavbar': ['ownerhome']}}])
  }
}
