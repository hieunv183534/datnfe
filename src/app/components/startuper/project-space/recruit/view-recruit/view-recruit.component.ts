import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-recruit',
  templateUrl: './view-recruit.component.html',
  styleUrls: ['./view-recruit.component.css']
})
export class ViewRecruitComponent implements OnInit {

  @Input() job: any
  constructor() { }

  ngOnInit() {
  }

}
