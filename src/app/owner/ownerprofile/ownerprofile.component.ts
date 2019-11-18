
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
// import { Owner } from 'DriveMe-Web/src/app/login/login.component';

export interface Owner{
  name: string;
  // email: string;
  address: string;
  telephone: string;
  nic: string;
  isDeleted: Boolean;
}

export interface userCredential{
  email: string;
}

@Component({
  selector: 'app-ownerprofile',
  templateUrl: './ownerprofile.component.html',
  styleUrls: ['./ownerprofile.component.scss']
})
export class OwnerprofileComponent implements OnInit {
  name: string;
  email: string;
  address: string;
  telephone: string;
  nic: string;
  ownerId: string;

  private ownerDoc: AngularFirestoreCollection<Owner>;
  owners: Observable<Owner[]>;
  
  private userDoc: AngularFirestoreCollection<userCredential>;
  users: Observable<userCredential[]>;

  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      let userID: string;
      this.spinner.show();
      userID = localStorage.getItem('ownerId');
      this.ownerId = userID;
      console.log("ownerId",this.ownerId)
      this.afs.doc<Owner>('users/user/owner/'+this.ownerId).valueChanges().subscribe(
        res=>{
          this.name = res.name;
          // this.email = res.email;
          this.address = res.address;
          this.nic = res.nic;
          this.telephone = res.telephone;
          this.afs.doc<userCredential>('userCredentials/'+localStorage.getItem("userCredentialId")).valueChanges().subscribe(
            res=>{
              this.email = res.email;
              // console.log(res)
              spinner.hide();
            }
          );
        }
      );
    
    }

  ngOnInit() {
    
  }

  changeOwnerDetails(){
    this.router.navigate(['/owner', {outlets: {'ownernavbar': ['editownerdetails']}}],{queryParams: {ownerId: this.ownerId}})

  }

  changePassword(){
    this.router.navigate(['/owner', {outlets: {'ownernavbar': ['changeuserpassword']}}],{queryParams: {userId: this.ownerId,userType:"owner"}})
    
  }

  // removeAdmin(adminId: string){
  //   this.afs.doc('users/user/admin/'+adminId).update({isDeleted:true}).then(_ => {
  //       this.openSnackBar("Admin Removed","Done");
  //     }
  //   );
  // }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
