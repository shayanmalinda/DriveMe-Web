import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar, MatStepper } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Parent{
  parentemail: string;
  parentaddress: string;
  parentphone: string;
  childname: string;
  childage: string;
  childschool: string;
  childschoolphone: string;
}

export interface userCredentials{
  email: string;
  password: string;
  parentId: string;
}

@Component({
  selector: 'app-editparentdetails',
  templateUrl: './editparentdetails.component.html',
  styleUrls: ['./editparentdetails.component.scss']
})
export class EditparentdetailsComponent implements OnInit {

  parentEmail: string;
  parentAddress: string;
  parentPhone: string;
  pass1: string;
  pass2: string;
  childName: string;
  childAge: string;
  childSchool: string;
  childSchoolPhone: string;

  parentId: string;

  waiting = false;
  passwordDiv=false;
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;

  parent: Parent;
  user: userCredentials;

  private parentDoc: AngularFirestoreDocument<Parent>;
  parents: Observable<Parent>;

  constructor(
    private _formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService) { 
      
    this.spinner.show();

  }

  

  ngAfterViewInit(){
    
    this.route.queryParams.subscribe(params => {
      this.parentId = params['parentId'];
    });
    this.parentDoc = this.afs.doc<Parent>('users/user/parent/'+this.parentId);
    this.parents = this.parentDoc.valueChanges();
    
    this.parents.forEach(a=>{
        this.parentEmail = a.parentemail;
        this.parentAddress = a.parentaddress;
        this.parentPhone = a.parentphone;
        this.childName = a.childname;
        this.childAge = a.childage;
        this.childSchool = a.childschool;
        this.childSchoolPhone = a.childschoolphone;
        this.cdRef.detectChanges();
        
        this.spinner.hide();
    });

    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      // ctrl1: ['', Validators.required],
      ctrl2: ['', Validators.required],
      ctrl3: ['', Validators.required],
      // ctrl4: ['', Validators.required],
      // ctrl5: ['', Validators.required],
      ctrl6: ['', Validators.required],
      ctrl7: ['', Validators.required],
      ctrl8: ['', Validators.required],
      ctrl9: ['', Validators.required],
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

  registerParent(){   
    this.waiting = true;
    this.parent={
      
      parentemail : this.parentEmail,
      parentaddress: this.parentAddress,
      parentphone: this.parentPhone,
      childname: this.childName,
      childage: this.childAge,
      childschool: this.childSchool,
      childschoolphone: this.childSchoolPhone
      
    }


    this.afs.doc('users/user/parent/'+this.parentId).update(this.parent).then(_ => {
        this.openSnackBar("Parent Details Updated","Done");
        this.waiting = false;
      }
    );
    
  }


}
