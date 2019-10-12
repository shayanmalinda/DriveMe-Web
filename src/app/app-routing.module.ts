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

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'driverregister',outlet: 'navbar', component: RegisterdriverComponent},
    ]
  },
  { path: 'driver', component: DriverComponent},
  { path: 'parent', component: ParentComponent},
  { path: 'passenger', component: PassengerComponent},
  { path: 'owner', component: OwnerComponent},
  { path: 'driver/payments', component: PaymentsComponent},
  { path: 'driver/profile', component: ProfileComponent},
  { path: 'driver/ratepassengers', component: RatePassengersComponent},
  { path: 'driver/sharelocation', component: ShareLocationComponent},
  { path: 'driver/vehicleroute', component: VehicleRouteComponent},
  { path: 'driver/passengerlist',component: PassengerListComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
