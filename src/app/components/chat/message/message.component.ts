import { MessageReact, MessageType } from 'src/app/model/enum';
import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MessageDto } from 'src/app/model/chat.class';
import { Util } from 'src/app/shared/util/util';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'div[app-message]',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

  MessageType = MessageType;

  @Input() message?: any = {};
  @Output() replyMessage: EventEmitter<void> = new EventEmitter<void>();

  favoriteEmojis = [
    { content: '❤️', value: MessageReact.Tym },
    { content: '👍', value: MessageReact.Like },
    { content: '😊', value: MessageReact.CuoiMim },
    { content: '😂', value: MessageReact.CuoiRaNuocMat },
    { content: '😀', value: MessageReact.CuoiToMat },
    { content: '😅', value: MessageReact.CuoiNgai },
    { content: '😍', value: MessageReact.CuoiTym },
    { content: '😱', value: MessageReact.OhMyGod },
    { content: '😉', value: MessageReact.NhiuMay },
  ];
  constructor(private chatService: ChatService
  ) {

  }

  getReacts(reacts: any[]) {
    return this.favoriteEmojis.find(e => reacts.some(r => r.react === e.value))?.content
  }
  ngOnInit() {
  }
  reactMessage(e: number, id: string) {
    this.chatService.reactMessage({ messageId: id, react: e })
  }
  pinMessage(message: MessageDto) {
    this.chatService.pinMessage({ messageId: message.id, isPin: false })
  }
  getDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }
  getDateTimeSeen(d: any) {
    return `Đã xem lúc ${Util.getDateTime(new Date(d))}`
  }
}
