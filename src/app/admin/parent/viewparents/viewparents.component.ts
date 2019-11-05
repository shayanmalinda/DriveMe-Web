import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface Parent{
  parentemail: string;
  parentaddress: string;
  parentphone: string;
  parentpass: string;
  childname: string;
  childschool: string;
  childschoolphone: string;
  childage: string;
}

@Component({
  selector: 'app-viewparents',
  templateUrl: './viewparents.component.html',
  styleUrls: ['./viewparents.component.scss']
})
export class ViewparentsComponent implements OnInit {

  private parentDoc: AngularFirestoreCollection<Parent>;
  parents: Observable<Parent[]>;
  constructor(
    private afs: AngularFirestore,private router : Router,private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,) { 
      this.spinner.show();
      this.parentDoc = this.afs.collection<Parent>('users/user/parent');
      this.parents = this.parentDoc.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as Parent;
          const id = a.payload.doc.id;
          spinner.hide();
          return {id,...data};
        }))
      )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  
  changeParentDetails(parentId: string , passenger:Parent){
    this.router.navigate(['/admin', {outlets: {'adminnavbar': ['editparentdetails']}}],{queryParams: {parentId: parentId}})

  }

  removeParent(parentId: string){
    
    this.spinner.show();

    this.afs.doc('users/user/parent/'+parentId).update({isDeleted:true}).then(_ => {
        this.openSnackBar("Parent Removed","Done");
        this.spinner.hide();
      }
    );

  }

  ngOnInit() {
  }
}
