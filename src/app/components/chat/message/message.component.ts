import { MessageReact, MessageType } from 'src/app/model/enum';
import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MessageDto } from 'src/app/model/chat.class';
import { Util } from 'src/app/shared/util/util';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'primeng/api';

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
  constructor(
    private chatService: ChatService,
    private messageService: MessageService
  ) {

  }

  // getReacts(reacts: any[]) {
  //   const emojis = [];
  //   for (const react of reacts) {
  //     const emoji = this.favoriteEmojis.find(e => e.value === react.react)?.content;
  //     if (emoji) {
  //       emojis.push(emoji);
  //     }
  //   }
  //   return emojis;
  // }

  getReacts(reacts: any[]) {
    const emojis = [];
    for (const react of reacts) {
      const emoji = this.favoriteEmojis.find(e => e.value === react.react);
      if (emoji) {
        const index = emojis.findIndex(e => e.emoji === emoji.content);
        if (index === -1) {
          emojis.push({ emoji: emoji.content, repeat: 1 });
        } else {
          emojis[index].repeat++;
        }
      }
    }
    return emojis;
  }


  ngOnInit() {
  }
  reactMessage(e: number, id: string) {
    this.chatService.reactMessage({ messageId: id, react: e })
  }
  pinMessage(message: MessageDto) {
    this.chatService.pinMessage({ messageId: message.id, isPin: true })
      .then(() => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Ghim thành công!",
        });
      })
      .catch(() => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Ghim thất bại!",
        });
      })
  }

  getDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }
  getDateTimeSeen(d: any) {
    return `Đã xem lúc ${Util.getDateTime(new Date(d))}`
  }
}
