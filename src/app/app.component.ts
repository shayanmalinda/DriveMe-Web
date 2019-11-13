import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DriveMe';

  constructor(){
    // localStorage.removeItem("driverId")
    // localStorage.removeItem("adminId")
    // localStorage.removeItem("ownerId")
    // localStorage.removeItem("parentId")
    // localStorage.removeItem("passengerId")

  }
}
