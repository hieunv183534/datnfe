import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationDto, GetListConversationDto, GetListMessageDto, MessageDto, MessageSendToConversationDto, MessageSendToUserDto } from 'src/app/model/chat.class';
import { MessageType } from 'src/app/model/enum';
import * as signalR from '@microsoft/signalr';

import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
TimeAgo.addDefaultLocale(vi)

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  conversationType: number = 0;
  conversationFilter?: string = "";
  conversations?: ConversationDto[] = [];
  messages?: MessageDto[] = [];
  timeAgo = new TimeAgo('vi-VI');
  contentText: string = "";
  connection?: signalR.HubConnection;

  emptyId: string = '00000000-0000-0000-0000-000000000000';

  userId: string = '';

  thisConversation?: ConversationDto = {};

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  getTimeAgo(d: any) {
    let time = new Date(d);
    return this.timeAgo.format(time)
  }

  ngOnInit() {
    this.getListConversation();
    this.initConversation();
    this.initSignal();
  }

  ngOnDestroy(): void {
    this.connection?.stop();
  }

  getListConversation() {
    let input = new GetListConversationDto();
    input.filter = this.conversationFilter;
    input.type = this.conversationType;
    input.skipCount = 0;
    input.maxResultCount = 1000;
    this.chatService.getListConversation(input).then((res: any) => {
      this.conversations = res.data.items;
    }).catch((err: any) => {

    });
  }

  getListMessage() {
    let input = new GetListMessageDto();
    input.conversationId = this.thisConversation?.id;
    input.skipCount = 0;
    input.maxResultCount = 1000;
    this.chatService.getListMessageByConversation(input).then((res: any) => {
      this.messages = res.data.items.reverse();
      console.log(this.messages);

    }).catch((err: any) => {

    });
  }

  initConversation() {
    this.route.params.subscribe(params => {
      let mode = params["mode"];
      let id = params["id"];
      if (mode == 0) { // id conversation

      } else { // id user
        this.userId = id;
        this.chatService.getConversationByUserId(id).then((res: any) => {
          this.thisConversation = res.data;
        }).catch((err: any) => {

        });
      }
    });
  }

  initSignal() {
    let token = localStorage.getItem("TOKEN") ?? "";
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7777/chat", {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err: any) {
      return console.error(err.toString());
    });

    this.connection.on("OnTestHehe", () => {
      alert("vãi lồng")
    });

    this.connection.on("OnMessage", (newMessage: any) => {
      this.getListConversation();
      if (newMessage.conversationId == this.thisConversation?.id) {
        this.getListMessage();
        this.seenConversation(this.thisConversation?.id ?? "");
      } else {
        alert("Tin nhắn mới hahaa");
      }
    });

    this.connection.on("OnNewRequestMessage", (newMessage: any) => {
      alert(2222222222222222222222222222222222222222222)
      debugger
    });
  }

  send() {
    if (this.contentText) {
      if (this.thisConversation?.id == this.emptyId) {
        let input = new MessageSendToUserDto();
        input.type = MessageType.Text;
        input.content = this.contentText;
        input.userId = this.userId;
        this.chatService.sendMessageToNewOther(input).then((res: any) => {
          this.thisConversation = res.data.newConversation;
          this.getListConversation();
          this.getListMessage();
          this.contentText = "";
        }).catch((err: any) => {
          this.messageService.add({
            key: "toast",
            severity: "error",
            summary: "Lỗi",
            detail: "Gửi tin nhắn đến người lạ thất bại!",
          });
        });
      } else {
        let input = new MessageSendToConversationDto();
        input.content = this.contentText;
        input.type = MessageType.Text;
        input.conversationId = this.thisConversation?.id;
        this.chatService.sendMessageToConversation(input).then((res: any) => {
          this.getListConversation();
          this.getListMessage();
          this.contentText = "";
        }).catch((err: any) => {
          this.messageService.add({
            key: "toast",
            severity: "error",
            summary: "Lỗi",
            detail: "Gửi tin nhắn đến đoạn chat thất bại!",
          });
        });
      }
    } else {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Bạn chưa nhập nội dung!",
      });
    }
  }

  seenConversation(conversationId: string) {
    this.chatService.seenConversation(conversationId).then((res: any) => {
      this.getListConversation();
    }).catch((err: any) => {

    });
  }

  selectConversation(conversation: any) {
    this.thisConversation = conversation;
    this.getListMessage();
    this.seenConversation(conversation.id);
  }

}
