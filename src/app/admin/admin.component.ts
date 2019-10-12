import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  router:Router;
  constructor() { }

  ngOnInit() {
  }

  logout(){
    this.router.navigate([''], { replaceUrl: true });
  }
}
