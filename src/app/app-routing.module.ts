import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DriverComponent } from './driver/driver.component';
import { ParentComponent } from './parent/parent.component';
import { PassengerComponent } from './passenger/passenger.component';
import { OwnerComponent  } from './owner/owner.component';
import { RegisterdriverComponent  } from './admin/driver/registerdriver/registerdriver.component';

import { PaymentsComponent } from './driver/payments/payments.component';
import { ProfileComponent } from './driver/profile/profile.component';
import { RatePassengersComponent } from './driver/rate-passengers/rate-passengers.component';

import { VehicleRouteComponent } from './driver/vehicle-route/vehicle-route.component';
import { PassengerListComponent } from './driver/passenger-list/passenger-list.component';
import { ViewdriversComponent } from './admin/driver/viewdrivers/viewdrivers.component';
import { EditdriverdetailsComponent } from './admin/driver/editdriverdetails/editdriverdetails.component';
import { ViewpassengersComponent } from './admin/passenger/viewpassengers/viewpassengers.component';
import { EditpassengerdetailsComponent } from './admin/passenger/editpassengerdetails/editpassengerdetails.component';
import { ViewparentsComponent } from './admin/parent/viewparents/viewparents.component';
import { RatingsPaymentsComponent } from './admin/driver/ratings-payments/ratings-payments.component';
import {  PassengerratingspaymentsComponent } from './admin/passenger/passengerratingspayments/passengerratingspayments.component';
import { EditparentdetailsComponent } from './admin/parent/editparentdetails/editparentdetails.component';
import { RegisteradminComponent } from './admin/admin/registeradmin/registeradmin.component';
import { ViewadminsComponent } from './admin/admin/viewadmins/viewadmins.component';
import { EditadmindetailsComponent } from './admin/admin/editadmindetails/editadmindetails.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';
import { ViewcheckpointsComponent } from './admin/driver/viewcheckpoints/viewcheckpoints.component';

import { RegisterpassengerComponent } from './passenger/registerpassenger/registerpassenger.component';

import { RegisterComponent } from './register/register.component';
import { PassengerratingsComponent } from './passenger/passengerratings/passengerratings.component';
import { PassengerpaymentsComponent } from './passenger/passengerpayments/passengerpayments.component';
import { PassengerpendingpaymentsComponent } from './passenger/passengerpendingpayments/passengerpendingpayments.component';
import { PassengerProfComponent } from './passenger/passengerprof/passengerprof.component';
import { ParenthomeComponent } from './parent/parenthome/parenthome.component';
import { PassengerhomeComponent } from './passenger/passengerhome/passengerhome.component';
import { ChangeUserPasswordComponent } from './shared/change-user-password/change-user-password.component';
import { ResetUserPasswordComponent } from './shared/reset-user-password/reset-user-password.component';
import { from } from 'rxjs';
import { OwnerprofileComponent } from './owner/ownerprofile/ownerprofile.component';
import { OwnerRatingsComponent } from './owner/driverdetails/owner-ratings/owner-ratings.component';
import { EditdetailsComponent } from './owner/editdetails/editdetails.component';
import { DriverdetailsComponent } from './owner/driverdetails/driverdetails.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { ViewpaymentsComponent} from './driver/viewpayments/viewpayments.component';
import { PaymentHistoryComponent } from './driver/payment-history/payment-history.component';
import { ViewownersComponent } from './admin/owner/viewowners/viewowners.component';
import { RegisterownerComponent } from './admin/owner/registerowner/registerowner.component';
import { EditownerdetailsComponent } from './admin/owner/editownerdetails/editownerdetails.component';
import { ViewratingsComponent } from './driver/viewratings/viewratings.component';
import { RecentRatingsComponent } from './driver/recent-ratings/recent-ratings.component';
import { ViewpaymentsParentComponent} from './driver/viewpayments-parent/viewpayments-parent.component'
import {PaymentHistoryParentComponent} from './driver/payment-history-parent/payment-history-parent.component';
import { PaymentsParentComponent } from './driver/payments-parent/payments-parent.component';
import { ViewratingsChildComponent } from './driver/viewratings-child/viewratings-child.component';
import { RecentRatingsChildComponent } from './driver/recent-ratings-child/recent-ratings-child.component';
import { RateChildComponent } from './driver/rate-child/rate-child.component';
import { DriverviewpassengerdetailsComponent } from './admin/driver/driverviewpassengerdetails/driverviewpassengerdetails.component';
import { OwnerPaymentsComponent } from './owner/driverdetails/owner-payments/owner-payments.component';
import { OwnerhomeComponent } from './owner/ownerhome/ownerhome.component';
import { PassengerAvailabilityComponent } from './driver/passenger-availability/passenger-availability.component';
import { DriverMyratingsComponent } from './driver/driver-myratings/driver-myratings.component';
import { OwnerPassengersComponent } from './owner/driverdetails/owner-passengers/owner-passengers.component';

// import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'driverregister',outlet: 'adminnavbar', component: RegisterdriverComponent},
      { path: 'viewdrivers',outlet: 'adminnavbar', component: ViewdriversComponent},
      { path: 'editdriverdetails',outlet: 'adminnavbar', component: EditdriverdetailsComponent},
      { path: 'viewpassengers',outlet: 'adminnavbar', component: ViewpassengersComponent},
      { path: 'editpassengerdetails',outlet: 'adminnavbar', component: EditpassengerdetailsComponent},
      { path: 'viewparents',outlet: 'adminnavbar', component: ViewparentsComponent},
      { path: 'editparentdetails',outlet: 'adminnavbar', component: EditparentdetailsComponent},
      { path: 'adminregister',outlet: 'adminnavbar', component: RegisteradminComponent},
      { path: 'viewadmins',outlet: 'adminnavbar', component: ViewadminsComponent},
      { path: 'editadmindetails',outlet: 'adminnavbar', component: EditadmindetailsComponent},
      { path: 'adminprofile',outlet: 'adminnavbar', component: AdminprofileComponent},
      { path: 'changeuserpassword',outlet: 'adminnavbar', component: ChangeUserPasswordComponent},
      { path: 'resetuserpassword',outlet: 'adminnavbar', component: ResetUserPasswordComponent},
      { path: 'adminhome',outlet: 'adminnavbar', component: AdminhomeComponent},
      { path: 'viewowners',outlet: 'adminnavbar', component: ViewownersComponent },
      { path: 'ownerregister',outlet: 'adminnavbar', component: RegisterownerComponent },
      { path: 'editownerdetails',outlet: 'adminnavbar', component: EditownerdetailsComponent },
      { path: 'driver-profile', outlet: 'adminnavbar', component: ProfileComponent},
      { path: 'driverviewdriverdetails', outlet: 'adminnavbar', component: DriverviewpassengerdetailsComponent},
      { path: 'viewcheckpoints', outlet: 'adminnavbar', component: ViewcheckpointsComponent},
      { path: 'ratingspayments', outlet: 'adminnavbar', component: RatingsPaymentsComponent},
      { path: 'passengerratingspayments', outlet: 'adminnavbar', component: PassengerratingspaymentsComponent},

    ]
  },
  { path: 'driver', component: DriverComponent,
    children:[
      { path: 'driver-payments',outlet: 'drivernavbar', component: PaymentsComponent},
      { path: 'driver-viewpayments', outlet:'drivernavbar',component: ViewpaymentsComponent},
      { path: 'driver-profile', outlet: 'drivernavbar', component: ProfileComponent},
      { path: 'driver-ratepassengers', outlet: 'drivernavbar', component: RatePassengersComponent},
      //{ path: 'driver-sharelocation', outlet: 'drivernavbar',component: ShareLocationComponent},
      { path: 'driver-vehicleroute', outlet: 'drivernavbar',component: VehicleRouteComponent},
      { path: 'driver-passengerlist', outlet: 'drivernavbar',component: PassengerListComponent},
      { path: 'changeuserpassword',outlet: 'drivernavbar', component: ChangeUserPasswordComponent},
      { path: 'payment-history', outlet: 'drivernavbar',component: PaymentHistoryComponent},
      {path: 'view-ratings',outlet:'drivernavbar',component: ViewratingsComponent},
      {path: 'recent-ratings',outlet:'drivernavbar',component:RecentRatingsComponent},
      {path: 'driver-viewparentpayments',outlet:'drivernavbar',component:ViewpaymentsParentComponent},
      {path: 'payment-history-parent',outlet: 'drivernavbar',component: PaymentHistoryParentComponent},
      {path: 'driver-payments-parent',outlet: 'drivernavbar',component:PaymentsParentComponent},
      {path: 'view-ratings-child',outlet: 'drivernavbar',component:ViewratingsChildComponent},
      {path: 'recent-ratings-child',outlet: 'drivernavbar',component:RecentRatingsChildComponent},
      {path: 'driver-ratechild',outlet:'drivernavbar',component:RateChildComponent},
      {path: 'driver-passengeravailability',outlet:'drivernavbar',component:PassengerAvailabilityComponent},
      {path: 'driver-viewmyratings',outlet:'drivernavbar',component:DriverMyratingsComponent},
      
    ]
  },


  { path: 'parent', component: ParentComponent,
    children:[
      { path: 'parenthome',outlet: 'parentnavbar', component: ParenthomeComponent},


    ]
  },


  { path: 'passenger', component: PassengerComponent,
    children: [

      // { path: 'passengerprofile',outlet: 'passengernavbar', component: PassengerProfileComponent},

      { path: 'passengerprofile',outlet: 'passengernavbar', component: PassengerProfComponent},
      { path: 'passengerratings',outlet: 'passengernavbar', component: PassengerratingsComponent},
      { path: 'passengerpendingpayments',outlet: 'passengernavbar', component: PassengerpendingpaymentsComponent},
      { path: 'passengerpayments',outlet: 'passengernavbar', component: PassengerpaymentsComponent},
      { path: 'passengerhome',outlet: 'passengernavbar', component: PassengerhomeComponent},
      { path: 'changeuserpassword',outlet: 'passengernavbar', component: ChangeUserPasswordComponent},
      { path: 'editpassengerdetails',outlet: 'passengernavbar', component: EditpassengerdetailsComponent},
      { path: 'changeuserpassword',outlet: 'passengernavbar', component: ChangeUserPasswordComponent},
    ]
  },

  { path: 'owner', component: OwnerComponent,
    children:[
      { path: 'ownerprofile',outlet: 'ownernavbar', component: OwnerprofileComponent},
      { path: 'owner-driverdetails',outlet: 'ownernavbar', component: DriverdetailsComponent},
      { path: 'owner-payments',outlet: 'ownernavbar', component: OwnerPaymentsComponent},
      { path: 'owner-editdetails',outlet:'ownernavbar',component:EditdetailsComponent},
      { path: 'changeuserpassword',outlet: 'ownernavbar', component: ChangeUserPasswordComponent},
      { path: 'ownerhome', outlet:'ownernavbar', component:OwnerhomeComponent},
      { path: 'owner-ratings', outlet:'ownernavbar', component:OwnerRatingsComponent},
      { path: 'owner-passengers', outlet: 'ownernavbar', component: OwnerPassengersComponent},
      
      
      // Define Route Here .................... 
      

    ]
  },
  { path: 'register', component: RegisterComponent},
  
 
];


@NgModule({
  // imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
