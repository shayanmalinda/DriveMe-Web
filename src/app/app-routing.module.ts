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
import { ShareLocationComponent } from './driver/share-location/share-location.component';
import { VehicleRouteComponent } from './driver/vehicle-route/vehicle-route.component';
import { PassengerListComponent } from './driver/passenger-list/passenger-list.component';
import { ViewdriversComponent } from './admin/driver/viewdrivers/viewdrivers.component';
import { EditdriverdetailsComponent } from './admin/driver/editdriverdetails/editdriverdetails.component';
import { ViewpassengersComponent } from './admin/passenger/viewpassengers/viewpassengers.component';
import { EditpassengerdetailsComponent } from './admin/passenger/editpassengerdetails/editpassengerdetails.component';
import { ViewparentsComponent } from './admin/parent/viewparents/viewparents.component';
import { EditparentdetailsComponent } from './admin/parent/editparentdetails/editparentdetails.component';
import { RegisteradminComponent } from './admin/admin/registeradmin/registeradmin.component';
import { ViewadminsComponent } from './admin/admin/viewadmins/viewadmins.component';
import { EditadmindetailsComponent } from './admin/admin/editadmindetails/editadmindetails.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';

import { RegisterpassengerComponent } from './passenger/registerpassenger/registerpassenger.component';

import { RegisterComponent } from './register/register.component';
import { ChangeUserPasswordComponent } from './shared/change-user-password/change-user-password.component';
import { from } from 'rxjs';
import { OwnerprofileComponent } from './owner/ownerprofile/ownerprofile.component';
import { DriverdetailsComponent } from './owner/driverdetails/driverdetails.component';
import { PassengerdetailsComponent } from './owner/passengerdetails/passengerdetails.component';
import { OwnvehiclesComponent } from './owner/ownvehicles/ownvehicles.component';
import { DriverpaymentsComponent } from './owner/payments/driverpayments/driverpayments.component';
import { PassengerpaymentsComponent } from './owner/payments/passengerpayments/passengerpayments.component';
import { RatingsComponent } from './owner/ratings/ratings.component';
import { MyvehiclesComponent } from './owner/ownvehicles/myvehicles/myvehicles.component';
import { RegisterVehicleComponent } from './owner/ownvehicles/register-vehicle/register-vehicle.component';




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
    ]
  },
  { path: 'driver', component: DriverComponent,
    children:[
      { path: 'driver-payments',outlet: 'drivernavbar', component: PaymentsComponent},
      { path: 'driver-profile', outlet: 'drivernavbar', component: ProfileComponent},
      { path: 'driver-ratepassengers', outlet: 'drivernavbar', component: RatePassengersComponent},
      { path: 'driver-sharelocation', outlet: 'drivernavbar',component: ShareLocationComponent},
      { path: 'driver-vehicleroute', outlet: 'drivernavbar',component: VehicleRouteComponent},
      { path: 'driver-passengerlist', outlet: 'drivernavbar',component: PassengerListComponent},
      { path: 'changeuserpassword',outlet: 'drivernavbar', component: ChangeUserPasswordComponent},
    ]
  },

  { path: 'parent', component: ParentComponent},
  { path: 'passenger', component: PassengerComponent,  
    children: [
      { path: 'passengerregister',outlet: 'passengernavbar', component: RegisterpassengerComponent},
    ]

  },
  { path: 'owner', component: OwnerComponent,
    children:[
      { path: 'ownerprofile',outlet: 'ownernavbar', component: OwnerprofileComponent},
      { path: 'owner-driverdetails',outlet: 'ownernavbar', component: DriverdetailsComponent},
      { path: 'owner-passengerdetails', outlet: 'ownernavbar', component: PassengerdetailsComponent},
      { path: 'owner-ownvehicles',outlet: 'ownernavbar', component: OwnvehiclesComponent },
      { path: 'owner-driverpayments',outlet: 'ownernavbar', component: DriverpaymentsComponent},
      { path: 'owner-passengerpayments',outlet: 'ownernavbar', component: PassengerpaymentsComponent},
      { path: 'owner-ratings',outlet: 'ownernavbar', component: RatingsComponent},
      { path: 'owner-myvehicles',outlet: 'ownernavbar', component: MyvehiclesComponent},
      { path: 'owner-registervehicles',outlet: 'ownernavbar', component: RegisterVehicleComponent},
      { path: 'owner-payments',outlet: 'ownernavbar', component: PaymentsComponent},
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
