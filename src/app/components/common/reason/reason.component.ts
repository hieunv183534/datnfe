import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit {

  @Input() number: any;
  @Input() title: any;
  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
