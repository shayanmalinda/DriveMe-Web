import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export interface owner {
  name: string;
  telephone: string;
  address: string;
  nic: string;
}

export interface userCredentials{
  email: string;
  password: string;
}

@Component({
  selector: 'app-editdetails',
  templateUrl: './editdetails.component.html',
  styleUrls: ['./editdetails.component.scss']
})
export class EditdetailsComponent implements OnInit {

  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;

  
  ownerName: string;
  ownerEmail: string;
  ownerTelephone: string;
  ownerAddress: string;
  ownerNIC: string;
  pass1: string;
  pass2: string;

  owner: owner;
  user: userCredentials;
  ownerId: string;

  ownerDoc: AngularFirestoreDocument<owner>;
  owners: Observable<owner>;
  
  userCredentialDoc: AngularFirestoreDocument<userCredentials>;
  userCredentials: Observable<userCredentials>;

  constructor(private _formBuilder: FormBuilder,
              private afs: AngularFirestore,
              private _snackBar: MatSnackBar,
              private afStorage: AngularFireStorage,
              private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
  }
  
    ngAfterViewInit(){
      this.route.queryParams.subscribe(params => {
        this.ownerId = params['ownerId'];
      });

      this.ownerDoc = this.afs.doc<owner>('users/user/owner/'+this.ownerId);
      this.owners = this.ownerDoc.valueChanges();

      
      this.userCredentialDoc = this.afs.doc<userCredentials>('userCredentials/'+localStorage.getItem('userCredentialId'));
      this.userCredentials = this.userCredentialDoc.valueChanges();

      this.owners.forEach(a=>{
        
          this.ownerName = a.name;
          this.ownerTelephone = a.telephone;
          this.ownerAddress = a.address;
          this.ownerNIC = a.nic;
          
          this.userCredentials.forEach(b=>{
            this.ownerEmail = b.email
            this.pass1 = b.password
            this.pass2 = b.password
            
            this.spinner.hide();
          });
      });

      
    }
    
  ngOnInit() {

    

    this.firstFormGroup = this._formBuilder.group({
      ctrl1: ['', Validators.required],
      // ctrl2: ['', Validators.required],
      ctrl3: ['', Validators.required],
      ctrl4: ['', Validators.required],
      ctrl5: ['', Validators.required],
      ctrl6: ['', Validators.required],
      ctrl7: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  stepperNext(stepper : MatStepper){
    if(this.pass1==this.pass2){
      stepper.next();
      this.passwordDiv = false;
    }
    else{
      this.passwordDiv = true;
    }
  }

  registerAdmin(){   
    this.waiting = true;
    this.owner={
      name : this.ownerName,
      telephone : this.ownerTelephone,
      address : this.ownerAddress,
      nic : this.ownerNIC,
    }

    this.user={
      email: this.ownerEmail,
      password: this.pass1
    }

    this.afs.doc('users/user/owner/'+this.ownerId).update(this.owner).then(_ => {
        
      this.afs.doc('userCredentials/'+localStorage.getItem("userCredentialId")).update(this.user).then(_ => {
        this.openSnackBar("Details Updated","Done");
        this.waiting = false;
      });
    });
    
  }


}
