import { MessageType } from 'src/app/model/enum';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageDto } from 'src/app/model/chat.class';
import { Util } from 'src/app/shared/util/util';

@Component({
  selector: 'div[app-message]',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

  MessageType = MessageType;

  @Input() message?: any = {};

  constructor() { }

  ngOnInit() {
  }

  getDateTime(d: any){
    return Util.getDateTime(new Date(d));
  }
  getDateTimeSeen(d: any){
    return `Đã xem lúc ${Util.getDateTime(new Date(d))}`
  }
}
