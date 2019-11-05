import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface Admin{
  name: string;
  email: string;
  address: string;
  telephone: string;
  nic: string;
  isDeleted: Boolean;
}

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit {
  name: string;
  email: string;
  address: string;
  telephone: string;
  nic: string;
  adminId: string;

  private adminDoc: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;
  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      let userID: string;
      this.spinner.show();
      userID = localStorage.getItem('currentUserId');
      this.adminId = userID;
      this.afs.doc<Admin>('users/user/admin/'+userID).valueChanges().subscribe(
        res=>{
          this.name = res.name;
          this.email = res.email;
          this.address = res.address;
          this.nic = res.nic;
          this.telephone = res.telephone;
          spinner.hide();
        }
      );
    
    }

  ngOnInit() {
    
  }

  changeAdminDetails(){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editadmindetails']}}],{queryParams: {adminId: this.adminId}})

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
