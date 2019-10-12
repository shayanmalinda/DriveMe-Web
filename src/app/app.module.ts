import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DriverComponent } from './driver/driver.component';
import { PassengerComponent } from './passenger/passenger.component';
import { ParentComponent } from './parent/parent.component';
import { OwnerComponent } from './owner/owner.component';
import { environment } from 'src/environments/environment';
import { MatDialogModule} from '@angular/material/dialog';
import { OverviewDialog,OverviewDialog2 } from './login/login.component'
import { MatModule } from './material.theme'
import { MatSnackBarModule } from '@angular/material';
import { RegisterdriverComponent } from './admin/driver/registerdriver/registerdriver.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    DriverComponent,
    PassengerComponent,
    ParentComponent,
    OwnerComponent,
    OverviewDialog,
    OverviewDialog2,
    RegisterdriverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatModule,
  ], 
  entryComponents: [LoginComponent, OverviewDialog, OverviewDialog2],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
