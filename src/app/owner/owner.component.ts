import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  

  logout(){
    // this.spinner.show()
    // setTimeout(function(){
    //   this.spinner.hide()
    // },2000)
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
    // setTimeout
  }

}
