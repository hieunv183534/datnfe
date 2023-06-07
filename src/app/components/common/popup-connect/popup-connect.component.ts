import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-connect',
  templateUrl: './popup-connect.component.html',
  styleUrls: ['./popup-connect.component.css']
})
export class PopupConnectComponent implements OnInit {
  @Input() name: string = "";

  constructor() { }

  ngOnInit() {
  }

}
