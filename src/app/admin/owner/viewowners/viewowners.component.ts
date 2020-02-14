import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface Owner{
  name: string;
  email: string;
  address: string;
  nic: string;
  isDeleted: Boolean;
  imgURL: string;
}

export interface userCredential { 
  email: string;
  ownerId: string;
  isDeleted: boolean;
} 

@Component({
  selector: 'app-viewowners',
  templateUrl: './viewowners.component.html',
  styleUrls: ['./viewowners.component.scss']
})
export class ViewownersComponent implements OnInit {

  private ownerDoc: AngularFirestoreCollection<Owner>;
  owners: Observable<Owner[]>;
  usersDoc: AngularFirestoreCollection<userCredential>; 
  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      this.spinner.show();
      this.ownerDoc = this.afs.collection<Owner>('users/user/owner');
      this.owners = this.ownerDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as Owner;
          const id = a.payload.doc.id;
          spinner.hide();
          return {id,...data};
        }))
      )
    
      
      // this.drivers.forEach(a=>{
      //   a.forEach(b=>{
      //     console.log(b.name);
      //   })
      // })
    }

  ngOnInit() {
  }

  changeOwnerDetails(ownerId: string , owner:Owner){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editownerdetails']}}],{queryParams: {ownerId: ownerId}})
  }

  removeOwner(ownerId: string){
    this.spinner.show();
    
    this.afs.doc('users/user/owner/'+ownerId).update({isDeleted:true}).then(_ => {
        
      this.usersDoc = this.afs.collection('userCredentials');
      this.usersDoc.snapshotChanges().pipe(
        map(actions => actions.map(y=>{
          const id = y.payload.doc.id;
          let userCredentialOwnerId = y.payload.doc.data().ownerId
          if(userCredentialOwnerId==ownerId){
            this.afs.doc('userCredentials/'+id).update({isDeleted:true}).then(_ => {
              this.openSnackBar("Owner Removed","Done");
              this.spinner.hide()
            }
          );
          }
          
        }
        ))
      ).subscribe();
    });
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  changePassword(ownerId: string){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['resetuserpassword']}}],{queryParams: {userId: ownerId,userType:"owner"}})
    
  }

}
