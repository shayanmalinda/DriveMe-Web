import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DriverComponent } from './driver/driver.component';
import { PassengerComponent } from './passenger/passenger.component';
import { ParentComponent } from './parent/parent.component';
import { OwnerComponent } from './owner/owner.component';
import { EditdetailsComponent } from './owner/editdetails/editdetails.component';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './driver/profile/profile.component';
import { VehicleRouteComponent } from './driver/vehicle-route/vehicle-route.component';

import { RatePassengersComponent } from './driver/rate-passengers/rate-passengers.component';
import { PaymentsComponent } from './driver/payments/payments.component';
import { PassengerListComponent } from './driver/passenger-list/passenger-list.component';

import { MatDialogModule} from '@angular/material/dialog';
import { OverviewDialog,OverviewDialog2 } from './login/login.component'
import { MatModule } from './material.theme'
import { MatSnackBarModule } from '@angular/material';
import { RegisterdriverComponent } from './admin/driver/registerdriver/registerdriver.component';
import { ViewdriversComponent } from './admin/driver/viewdrivers/viewdrivers.component';
import { EditdriverdetailsComponent } from './admin/driver/editdriverdetails/editdriverdetails.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgxspinnerComponent } from './shared/ngxspinner/ngxspinner.component';
import { ViewpassengersComponent } from './admin/passenger/viewpassengers/viewpassengers.component';
import { EditpassengerdetailsComponent } from './admin/passenger/editpassengerdetails/editpassengerdetails.component';
import { ViewparentsComponent } from './admin/parent/viewparents/viewparents.component';
import { EditparentdetailsComponent } from './admin/parent/editparentdetails/editparentdetails.component';
import { ViewadminsComponent } from './admin/admin/viewadmins/viewadmins.component';
import { RegisteradminComponent } from './admin/admin/registeradmin/registeradmin.component';
import { EditadmindetailsComponent } from './admin/admin/editadmindetails/editadmindetails.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';

import { RegisterpassengerComponent } from './passenger/registerpassenger/registerpassenger.component';

import { RegisterComponent } from './register/register.component';
import { PassengerprofileComponent } from './passenger/passengerprofile/passengerprofile.component';
import { OwnvehiclesComponent } from './owner/ownvehicles/ownvehicles.component';
import { OwnerprofileComponent } from './owner/ownerprofile/ownerprofile.component';
import { DriverdetailsComponent } from './owner/driverdetails/driverdetails.component';
import { PassengerdetailsComponent } from './owner/passengerdetails/passengerdetails.component';
import { RatingsComponent } from './owner/ratings/ratings.component';
import { ChangeUserPasswordComponent } from './shared/change-user-password/change-user-password.component';
import { DriverpaymentsComponent } from './owner/payments/driverpayments/driverpayments.component';
import { PassengerpaymentsComponent } from './owner/payments/passengerpayments/passengerpayments.component';
import { MyvehiclesComponent } from './owner/ownvehicles/myvehicles/myvehicles.component';
import { RegisterVehicleComponent } from './owner/ownvehicles/register-vehicle/register-vehicle.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { ViewpaymentsComponent } from './driver/viewpayments/viewpayments.component';
import { PaymentHistoryComponent } from './driver/payment-history/payment-history.component';



import { ViewownersComponent } from './admin/owner/viewowners/viewowners.component';
import { RegisterownerComponent } from './admin/owner/registerowner/registerowner.component';
import { EditownerdetailsComponent } from './admin/owner/editownerdetails/editownerdetails.component';
import { ViewratingsComponent } from './driver/viewratings/viewratings.component';
import { RecentRatingsComponent } from './driver/recent-ratings/recent-ratings.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    DriverComponent,
    PassengerComponent,
    ParentComponent,
    OwnerComponent,
    ProfileComponent,
    VehicleRouteComponent,
   
    RatePassengersComponent,
    PaymentsComponent,
    PassengerListComponent,
 
    OverviewDialog,
    OverviewDialog2,
    RegisterdriverComponent,
    ViewdriversComponent,
    EditdriverdetailsComponent,
    NgxspinnerComponent,
    ViewpassengersComponent,
    EditpassengerdetailsComponent,
    ViewparentsComponent,
    EditparentdetailsComponent,
    ViewadminsComponent,
    RegisteradminComponent,
    EditadmindetailsComponent,
    AdminprofileComponent,

    RegisterpassengerComponent,

    RegisterComponent,
    PassengerprofileComponent,
    OwnvehiclesComponent,
    DriverdetailsComponent,
    PassengerdetailsComponent,
    RatingsComponent,
    ChangeUserPasswordComponent,
    OwnerprofileComponent,
    DriverpaymentsComponent,
    PassengerpaymentsComponent,
    MyvehiclesComponent,
    RegisterVehicleComponent,
    AdminhomeComponent,
    EditdetailsComponent,
    ViewownersComponent,
    RegisterownerComponent,
    EditownerdetailsComponent,
    ViewpaymentsComponent,
    PaymentHistoryComponent,
    
    ViewownersComponent,
    RegisterownerComponent,
    EditownerdetailsComponent,
    ViewratingsComponent,
    RecentRatingsComponent,


  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    AngularFireModule.initializeApp(environment.firebase),

    // AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatModule,
    NgxSpinnerModule,
    HttpClientModule
  ], 
  entryComponents: [LoginComponent, OverviewDialog, OverviewDialog2],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
