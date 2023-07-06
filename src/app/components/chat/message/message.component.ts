import { Component, Input, OnInit } from '@angular/core';
import { MessageDto } from 'src/app/model/chat.class';

@Component({
  selector: 'div[app-message]',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message?: MessageDto = {};

  constructor() { }

  ngOnInit() {
  }

}
