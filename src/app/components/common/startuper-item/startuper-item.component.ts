import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-startuper-item',
  templateUrl: './startuper-item.component.html',
  styleUrls: ['./startuper-item.component.css']
})
export class StartuperItemComponent implements OnInit {

  @Input() name: string = "";
  @Input() introduce: string = "";
  @Input() age: string = "";
  @Input() location: string = "";
  @Input() skill: string = "";
  @Input() expertise: string = "";
  @Input() personality: string = "";
  @Input() achievement: string = "";

  isHovered: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
