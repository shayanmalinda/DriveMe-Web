import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase';

export interface Admin{
  name: string;
  email: string;
  address: string;
  telephone: string;
  nic: string;
  isDeleted: Boolean;
  imageURL: string;
}

export interface userCredentials { 
  email: string;
  adminId: string;
  isDeleted: boolean;
} 

@Component({
  selector: 'app-viewadmins',
  templateUrl: './viewadmins.component.html',
  styleUrls: ['./viewadmins.component.scss']
})
export class ViewadminsComponent implements OnInit {

  private adminDoc: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;
  private usersDoc: AngularFirestoreCollection<userCredentials>;  
  testImage: string;
 
  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) { 
      this.spinner.show();
      this.adminDoc = this.afs.collection<Admin>('users/user/admin');
      
      
      this.admins = this.adminDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          var data = a.payload.doc.data() as Admin;
          const id = a.payload.doc.id;      
          const userStorageRef = firebase.storage().ref('adminImages').child(id);
          userStorageRef.getDownloadURL().then(function onSuccess(url) {
           
            data.imageURL = url
            console.log("URLL===",data.imageURL)
          })
          .catch(function onError(err) {
            console.log("Image Not Found");
          })
          spinner.hide();
          console.log(data)
          console.log(data.imageURL)
          return {id,...data};
        }))
      );
    
    }

  ngOnInit() {
    
  }

  changeadmindetails(adminId: string , driver:Admin){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editadmindetails']}}],{queryParams: {adminId: adminId}})

  }



  removeAdmin(adminId: string){
    this.afs.doc('users/user/admin/'+adminId).update({isDeleted:true}).then(_ => {
        
        this.usersDoc = this.afs.collection('userCredentials');
        this.usersDoc.snapshotChanges().pipe(
          map(actions => actions.map(y=>{
            const id = y.payload.doc.id;
            let userCredentialAdminId = y.payload.doc.data().adminId
            if(userCredentialAdminId==adminId){
              this.afs.doc('userCredentials/'+id).update({isDeleted:true}).then(_ => {
                this.openSnackBar("Admin Removed","Done");
              }
            );
            }
            
          }
          ))
        ).subscribe();
      }
    );

    
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
