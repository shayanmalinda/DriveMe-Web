import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface Passenger{
  name: string;
  email: string;
  address: string;
  phone: string;
  isDeleted: boolean;
}
export interface userCredential{
  email: string;
  password: string;
  passengerId: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-viewpassengers',
  templateUrl: './viewpassengers.component.html',
  styleUrls: ['./viewpassengers.component.scss']
})
export class ViewpassengersComponent implements OnInit {

  private passengerDoc: AngularFirestoreCollection<Passenger>;
  passengers: Observable<Passenger[]>;
  usersDoc: AngularFirestoreCollection<userCredential>;  
  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      this.spinner.show();
      this.passengerDoc = this.afs.collection<Passenger>('users/user/passenger');
      this.passengers = this.passengerDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as Passenger;
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

  changePassengerDetails(passengerId: string , passenger:Passenger){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editpassengerdetails']}}],{queryParams: {passengerId: passengerId}})

  }

  changePassword(passengerId: string){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['changeuserpassword']}}],{queryParams: {userId: passengerId,userType:"passenger"}})
    
  }
  removePassenger(passengerId: string){
    
    this.spinner.show();
    
    this.afs.doc('users/user/passenger/'+passengerId).update({isDeleted:true}).then(_ => {
        
      this.usersDoc = this.afs.collection('userCredentials');
      this.usersDoc.snapshotChanges().pipe(
        map(actions => actions.map(y=>{
          const id = y.payload.doc.id;
          let userCredentialPassengerId = y.payload.doc.data().passengerId
          if(userCredentialPassengerId==passengerId){
            this.afs.doc('userCredentials/'+id).update({isDeleted:true}).then(_ => {
              this.openSnackBar("Passenger Removed","Done");
              this.spinner.hide()
            }
          );
          }
          
        }
        ))
      ).subscribe();
    });
  }
}
