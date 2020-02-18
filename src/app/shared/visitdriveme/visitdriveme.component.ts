import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-visitdriveme',
  templateUrl: './visitdriveme.component.html',
  styleUrls: ['./visitdriveme.component.scss']
})
export class VisitdrivemeComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goback(){
    this._location.back()
  }

}
