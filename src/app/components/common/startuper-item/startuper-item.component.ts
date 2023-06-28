import { Component, Input, OnInit } from '@angular/core';
import { StartuperDto } from 'src/app/model/startuper.class';

@Component({
  selector: 'app-startuper-item',
  templateUrl: './startuper-item.component.html',
  styleUrls: ['./startuper-item.component.css']
})
export class StartuperItemComponent implements OnInit {

  @Input() startuper: StartuperDto = {}

  isHovered: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
