import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DriverComponent } from './driver/driver.component';
import { ParentComponent } from './parent/parent.component';
import { PassengerComponent } from './passenger/passenger.component';
import { OwnerComponent  } from './owner/owner.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'driver', component: DriverComponent},
  { path: 'parent', component: ParentComponent},
  { path: 'passenger', component: PassengerComponent},
  { path: 'owner', component: OwnerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
