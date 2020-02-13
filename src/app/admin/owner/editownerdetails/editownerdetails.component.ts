import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


export interface Owner {
  name: string;
  telephone: string;
  nic: string;
}

export interface userCredentials{
  email: string;
  password: string;
}

@Component({
  selector: 'app-editownerdetails',
  templateUrl: './editownerdetails.component.html',
  styleUrls: ['./editownerdetails.component.scss']
})
export class EditownerdetailsComponent implements OnInit {

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

  owner: Owner;
  user: userCredentials;
  ownerId: string;

  ownerDoc: AngularFirestoreDocument<Owner>;
  owners: Observable<Owner>;
  
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
        console.log("ownerId "+this.ownerId);
      });

      this.ownerDoc = this.afs.doc<Owner>('users/user/owner/'+this.ownerId);
      this.owners = this.ownerDoc.valueChanges();

      
      this.userCredentialDoc = this.afs.doc<userCredentials>('userCredentials/'+localStorage.getItem('userCredentialId'));
      this.userCredentials = this.userCredentialDoc.valueChanges();

      this.owners.forEach(a=>{
        
          this.ownerName = a.name;
          this.ownerTelephone = a.telephone;
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
      ctrl4: ['', Validators.required],
      ctrl5: ['', Validators.required],
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

  registerOwner(){   
    this.waiting = true;
    this.owner={
      name : this.ownerName,
      telephone : this.ownerTelephone,
      nic : this.ownerNIC,
    }

    this.user={
      email: this.ownerEmail,
      password: this.pass1
    }

    this.afs.doc('users/user/owner/'+this.ownerId).update(this.owner).then(_ => {
        
      this.openSnackBar("Owner Details Updated","Done");
      this.waiting = false;
    });
    
  }


}
