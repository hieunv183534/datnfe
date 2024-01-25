import { MessageReact, MessageType } from 'src/app/model/enum';
import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MessageDto } from 'src/app/model/chat.class';
import { Util } from 'src/app/shared/util/util';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/services/event.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'div[app-message]',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

  MessageType = MessageType;
  listUserInConversation: any[] = [];
  display: boolean = false;

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
    private eventService: EventService,
    private messageService: MessageService
  ) {

  }

  deleteMessage(messageId: string, m: MessageDto) {
    this.chatService.deleteMessage(messageId)
      .then(() => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Xóa tin nhắn thành công!",
        });
      })
      .catch(() => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Thành công",
          detail: "Xóa tin nhắn thất bại!",
        });
      })
  }
  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }
  ngOnInit() {
    this.eventService.currentConversationUsers.subscribe(users => {
      this.listUserInConversation = users
      console.log(users);

    })
    const emojis = [];
    for (let i = 0; i < this.message.reacts.length; i++) {
      const emoji = this.favoriteEmojis.find(e => e.value === this.message.reacts[i].react);
      if (emoji) {
        const user = this.listUserInConversation.find(u => u.user.id === this.message.reacts[i].userId);
        const index = emojis.findIndex((e: { emoji?: string }) => e.emoji === emoji.content);
        if (index === -1) {
          emojis.push({ ...this.message.reacts[i], emoji: emoji.content, repeat: 1, users: user ? [user.user] : [] });
        } else {
          if (user) {
            emojis[index].users.push(user.user);
          }
          emojis[index].repeat++;
        }
      }
    }
    this.message.reacts = emojis;
    console.log(this.message.reacts);

  }
  reactMessage(e: number | null, id: string) {

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
