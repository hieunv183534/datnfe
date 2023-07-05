import { Component, OnInit } from '@angular/core';
import { ConversationDto, MessageDto } from 'src/app/model/chat.class';
import { MessageType } from 'src/app/model/enum';

import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
TimeAgo.addDefaultLocale(vi)

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  conversationType: number = 1;

  conversations?: ConversationDto[] = [];

  messages?: MessageDto[] = [];

  timeAgo = new TimeAgo('vi-VI');

  contentText: string = "";

  constructor() { }

  getTimeAgo(d: any) {
    let time = new Date(d);
    return this.timeAgo.format(Date.now() - 60 * 1000)
  }

  ngOnInit() {
    this.conversations = [
      {
        conversationName: "FSI Connected",
        conversationAvatar: "http://localhost:7777/images/c7401c6d-2592-4fcf-a417-42c9a03e5bac.png",
        justTwoPeople: false,
        lastMessage: {
          content: "Vãi lồng đèn thiệt chứ :))",
          type: MessageType.Text,
          creationTime: new Date(),
          sender: {
            name: "Nguyễn Văn Hiếu",
            avatarUrl: "http://localhost:7777/images/c7401c6d-2592-4fcf-a417-42c9a03e5bac.png",
          }
        }
      },
      {
        conversationName: "FSI Connected",
        conversationAvatar: "http://localhost:7777/images/c7401c6d-2592-4fcf-a417-42c9a03e5bac.png",
        justTwoPeople: false,
        lastMessage: {
          content: "Vãi lồng đèn thiệt chứ :))",
          type: MessageType.Text,
          creationTime: new Date(),
          sender: {
            name: "Nguyễn Văn Hiếu",
            avatarUrl: "http://localhost:7777/images/c7401c6d-2592-4fcf-a417-42c9a03e5bac.png",
          }
        }
      },
      {
        conversationName: "FSI Connected",
        conversationAvatar: "http://localhost:7777/images/c7401c6d-2592-4fcf-a417-42c9a03e5bac.png",
        justTwoPeople: false,
        lastMessage: {
          content: "Vãi lồng đèn thiệt chứ :))",
          type: MessageType.Text,
          creationTime: new Date(),
          sender: {
            name: "Nguyễn Văn Hiếu",
            avatarUrl: "http://localhost:7777/images/c7401c6d-2592-4fcf-a417-42c9a03e5bac.png",
          }
        }
      }
    ]
  }

}
