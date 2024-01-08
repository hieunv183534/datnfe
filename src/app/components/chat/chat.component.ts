import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation, ElementRef } from '@angular/core';
import { ConversationDto, GetListConversationDto, GetListMessageDto, MessageDto, MessageSendToConversationDto, MessageSendToUserDto } from 'src/app/model/chat.class';
import { MessageType } from 'src/app/model/enum';
import * as signalR from '@microsoft/signalr';
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Util } from 'src/app/shared/util/util';
import { EventService } from 'src/app/services/event.service';
import jwt_decode from 'jwt-decode';
TimeAgo.addDefaultLocale(vi)

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ChatComponent implements OnInit, OnDestroy {
  conversationType: number = 0;
  conversationFilter?: string = "";
  conversations?: ConversationDto[] = [];
  messages: MessageDto[] = [];
  timeAgo = new TimeAgo('vi-VI');
  contentText: string = "";
  connection?: signalR.HubConnection;
  screenWidth: number = window.innerWidth;
  emptyId: string = '00000000-0000-0000-0000-000000000000';
  userId: string = '';
  thisConversation?: ConversationDto = undefined;
  isVisibleAddConversation: boolean = false;
  isVisibleUpdateConversation: boolean = false;
  isShowInfoBox: boolean = false;
  isShowEmoji: boolean = true;
  isVisibleCall: boolean = false;
  isMobile: boolean = false;
  isAllPinned: boolean = false;
  listPinned: any[] = [];

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private eventService: EventService,
    private eRef: ElementRef
  ) { }
  @HostListener('document:click', ['$event'])
  clickOutside(event:any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isAllPinned = false;
    }
  }
  addEmoji(data: any) {
    this.contentText = this.contentText + " " + data.emoji.native;
  }

  getTimeAgo(d: any) {
    let time = new Date(d);
    return this.timeAgo.format(time)
  }

  getDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }

  ngOnInit() {
    this.getListConversation();
    this.initConversation();
    this.initSignal();
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
    this.listPinned=[
      {
        title:"tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyện, rip, ghim tin trong chat",
        sender:"văn hiếu"
      },
      {
        title:"lưu  trữ trò chuyện, ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyện, rip, ghim tin trong chat",
        sender:"văn hiếu"

      },
      {
        title:" ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyn",
        sender:"văn hiếu"

      },
      {
        title:"listPinned listPinnedlistPinned listPinned listPinned",
        sender:"văn hiếu"
      },
      {
        title:"l ghim, đánh dấu chưa đọc,tắt thông báo(tắt trong bao lâu), xóa cuộc trò chuyn",
        sender:"văn hiếu"
      },
    ]
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize() {
    // Set the width for 'sm' as per your requirement
    const sm = 576;
    if (this.screenWidth <= sm) {
      this.isShowInfoBox = false;
    }
    if (this.screenWidth <= sm) {
      this.isMobile = true;
      let avatar = document.querySelector('p-avatar');
      avatar?.setAttribute('size', "sm");
    }
    else {
      this.isMobile = false;
    }
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
      this.messages?.forEach((m: MessageDto, i: number) => {
        if (i == 0) {
          m.showA = true;
        } else {
          let _m = this.messages[i - 1];
          if (m.sender?.id == _m.sender?.id) {
            let diff = Number(new Date(m.creationTime ?? "")) - Number(new Date(_m.creationTime ?? ""));
            if (diff > 240000) {
              m.showA = true;
            } else {
              m.showA = false;
            }
          } else {
            m.showA = true;
          }
        }
      });
    }).catch((err: any) => {

    });
  }
  unmountCoversation() {
    this.thisConversation = undefined
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
          this.getListMessage();
        }).catch((err: any) => {

        });
      }
    });
  }

  initSignal() {
    let token = localStorage.getItem("TOKEN") ?? "";
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://fsiconnected.cloud/chat", {
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
        this.messageService.add({
          key: "newMessage",
          severity: "info",
          summary: "Tin nhắn mới",
          detail: "Tin nhắn mới",
        });
      }
    });

    this.connection.on("OnNewRequestMessage", (newMessage: any) => {
      alert(2222222222222222222222222222222222222222222)
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

  sendLike() {
    if (this.thisConversation?.id == this.emptyId) {
      let input = new MessageSendToUserDto();
      input.type = MessageType.Sticker;
      input.content = "(like)";
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
          detail: "Gửi like đến người lạ thất bại!",
        });
      });
    } else {
      let input = new MessageSendToConversationDto();
      input.content = "(like)";
      input.type = MessageType.Sticker;
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
          detail: "Gửi like đến đoạn chat thất bại!",
        });
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

  addConversationSuccess(newConversation: any) {
    this.getListConversation();
    this.thisConversation = newConversation;
    this.getListMessage();
    this.isVisibleAddConversation = false;
  }

  updateConversationSuccess(conversation: any) {
    this.getListConversation();
    this.thisConversation = conversation;
    this.getListMessage();
    this.isVisibleUpdateConversation = false;
  }

  infoConversation() {
    if (this.thisConversation?.justTwoPeople) {
      let currentUserId = this.getDecodedAccessToken().nameid;
      let userId = currentUserId == this.thisConversation.userAId ? this.thisConversation.userBId : this.thisConversation.userAId;
      this.eventService.showUserDetail(userId ?? "");
    } else {
      this.isVisibleUpdateConversation = true;
    }
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }


}
