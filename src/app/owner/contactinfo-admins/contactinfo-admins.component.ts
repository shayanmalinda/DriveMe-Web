import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

export interface admins{
  name: string;
  email: string;
  telephone : string;
}
export interface userCredential{
  email: string;
  password: string;
  driverId: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-contactinfo-admins',
  templateUrl: './contactinfo-admins.component.html',
  styleUrls: ['./contactinfo-admins.component.scss']
})
export class ContactinfoAdminsComponent implements OnInit {
  // x: boolean = true;

  private adminDoc: AngularFirestoreCollection<admins>;
  admins: Observable<admins[]>;
  usersDoc: AngularFirestoreCollection<userCredential>; 


  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      this.spinner.show();
      this.adminDoc = this.afs.collection<admins>('users/user/admin');
      this.admins = this.adminDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as admins;
          const id = a.payload.doc.id;
          spinner.hide();
          return {id,...data};
        }))
      )
    }

  ngOnInit() {
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
