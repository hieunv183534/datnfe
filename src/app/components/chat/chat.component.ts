import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewChecked, AfterViewInit } from '@angular/core';
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
  inviteUsers: any[] = [];
  messages: MessageDto[] = [];
  replyMessage?: MessageDto = undefined;
  replyMe?: boolean = false;
  focusToMessageId: string = ''
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
  rows: number = 1;
  maxRows: number = 5;
  files: any[] = [];
  timeNow: any = new Date();
  maxResultCount: number = 20
  skipCount: number = 0
  isCalled: boolean = false;
  isLoading: boolean = false;
  preScrollHeight: number = 0
  loadedFull: boolean = false
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @ViewChild("areaInput") set areaInput(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus() ;
    }
  }
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private eventService: EventService,
    private eRef: ElementRef
  ) { }

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
    // this.files=[
    //   {
    //     url:"https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg"
    //   },
    //   {
    //     url:"https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg"
    //   },
    //   {
    //     url:"https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg"
    //   },
    //   {
    //     url:"https://kms.ctin.vn/csp.kms/shared/api/user/avatar/d42e7516-2924-4628-bb4e-a3d8e4e20cbbaced5fc1-2642-4a85-afdf-8e4de49d2e3e.jpg"
    //   },
    // ]

  }

  handleScroll(event: Event) {
    const target = event.target as HTMLDivElement;
    const scrollPosition = target.scrollTop;
    const elementHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    this.preScrollHeight = elementHeight

    if ((scrollPosition / (elementHeight - clientHeight) == 0)) {
      if (this.loadedFull) {
        return;
      }
      if (!this.isCalled) {
        this.isCalled = true;
        // this.skipCount += this.maxResultCount;
        this.skipCount = this.skipCount == 0 ? (this.maxResultCount == 20 ? 20 : this.maxResultCount) : (this.skipCount + 20);
        this.isLoading = true
        setTimeout(() => {
          this.getListMessage(false, false, 20);
        }, 200)

      }
    } else {
      this.isCalled = false;
    }
  }

  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  @HostListener('window:resize', ['$event'])

  onResize() {
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize() {
    // Set the width for 'sm' as per your requirement
    const sm = 576;
    const md = 900;
    if (this.screenWidth <= md) {
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

  async getListMessage(scrollToBottom: boolean, isLast: boolean, loadMoreSize?: number) {
    // this.isLoading = true
    let input = new GetListMessageDto();
    input.conversationId = this.thisConversation?.id;
    input.skipCount = this.skipCount;
    input.maxResultCount = loadMoreSize ? loadMoreSize : this.maxResultCount;
    await this.chatService.getListMessageByConversation(input).then((res: any) => {
      // this.messages = res.data.items.reverse();
      // this.messages?.forEach((m: MessageDto, i: number) => {
      //   if (i == 0) {
      //     m.showA = true;
      //   } else {
      //     let _m = this.messages[i - 1];
      //     if (m.sender?.id == _m.sender?.id) {
      //       let diff = Number(new Date(m.creationTime ?? "")) - Number(new Date(_m.creationTime ?? ""));
      //       if (diff > 240000) {
      //         m.showA = true;
      //       } else {
      //         m.showA = false;
      //       }
      //     } else {
      //       m.showA = true;
      //     }
      //   }
      // });
      const data = res.data.items.reverse();
      if (data.length < 20 && loadMoreSize) {
        this.maxResultCount = res.data.totalCount
        this.loadedFull = true;
      }
      if (isLast)
        this.messages = data;
      else
        this.messages.unshift(...data);
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
      if (this.preScrollHeight < this.myScrollContainer.nativeElement.scrollHeight) {
        setTimeout(() => {
          this.myScrollContainer.nativeElement.scrollTop += this.myScrollContainer.nativeElement.scrollHeight - (this.preScrollHeight + 64);
        }, 1)

      }

      if (scrollToBottom)
        setTimeout(() => {
          this.scrollToBottom()
        }, 1)
    }).catch((err: any) => {
    })
      .finally(() => this.isLoading = false)
      ;

  }

  unmountConversation() {
    this.thisConversation = undefined
  }
  initConversation() {
    this.route.params.subscribe((params: any) => {
      let mode = params["mode"];
      let id = params["id"];
      if (mode == 0) { // id conversation

      } else { // id user
        this.userId = id;
        this.chatService.getConversationByUserId(id).then((res: any) => {
          this.thisConversation = res.data;
          this.getListMessage(true, true);
        }).catch((err: any) => {

        });
      }
    });
  }

  initSignal() {
    let token = localStorage.getItem("TOKEN") ?? "";
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://fsiconnectedapi.azurewebsites.net/chat", {
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

    // this.connection.on("OnTestHehe", () => {
    //   alert("vãi lồng")
    // });

    this.connection.on("OnMessage", (newMessage: any) => {
      this.getListConversation();
      if (newMessage.conversationId == this.thisConversation?.id) {
        this.getListMessage(true, true);
        // this.messages.push(newMessage)
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
      debugger
    });

    this.connection.on("OnReactMessage", (message: MessageDto) => {
      this.maxResultCount = this.loadedFull ? this.maxResultCount : ((this.skipCount == 0) ? this.maxResultCount : this.skipCount + 20)
      this.skipCount = 0
      this.getListMessage(false, true);
      // this.seenConversation(this.thisConversation?.id ?? "");
      // let userName
      // this.eventService.currentConversationUsers.subscribe(users => {
      //   userName = users.find(u => u.user.id == message.senderId).user.name
      // })
      if (this.getDecodedAccessToken().nameid !== message.senderId)
        this.messageService.add({
          key: "newMessage",
          severity: "info",
          summary: "Tin nhắn mới",
          detail: `Đã bày tỏ cảm xúc`,
        });
    });
    this.connection.on("OnPinMessage", (message: MessageDto) => {
      if (this.getDecodedAccessToken().nameid !== message.senderId)
        this.messageService.add({
          key: "newMessage",
          severity: "info",
          summary: "Tin nhắn mới",
          detail: "Đã ghim tin nhắn",
        });
    });
    this.connection.on("OnDeleteMessage", (message: MessageDto) => {
      this.maxResultCount = this.loadedFull ? this.maxResultCount - 1 : ((this.skipCount == 0) ? this.maxResultCount - 1 : this.skipCount + 20)

      this.skipCount = 0
      this.getListMessage(false, true);
      if (this.getDecodedAccessToken().nameid !== message.senderId)
        this.messageService.add({
          key: "newMessage",
          severity: "info",
          summary: "Tin nhắn mới",
          detail: "Đã xóa tin nhắn",
        });
    });
  }

  send() {
    this.maxResultCount = this.loadedFull ? this.maxResultCount + 1 : ((this.skipCount == 0) ? (this.maxResultCount + 1) : (this.skipCount + 21))
    this.skipCount = 0
    if (this.contentText) {
      if (this.thisConversation?.id == this.emptyId) {
        let input = new MessageSendToUserDto();
        input.type = MessageType.Text;
        input.content = this.contentText;
        input.userId = this.userId;
        this.chatService.sendMessageToNewOther(input).then((res: any) => {
          this.thisConversation = res.data.newConversation;
          this.getListConversation();
          this.getListMessage(true, true);
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
        if (this.focusToMessageId !== "")
          input.focusToMessageId = this.focusToMessageId;
        input.conversationId = this.thisConversation?.id;
        this.chatService.sendMessageToConversation(input).then((res: any) => {
          // this.getListConversation();
          // this.getListMessage();
          this.replyMessage = undefined;
          this.focusToMessageId = '';
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
    this.maxResultCount = this.loadedFull ? this.maxResultCount + 1 : ((this.skipCount == 0) ? (this.maxResultCount + 1) : (this.skipCount + 21))

    this.skipCount = 0
    if (this.thisConversation?.id == this.emptyId) {
      let input = new MessageSendToUserDto();
      input.type = MessageType.Sticker;
      input.content = "(like)";
      input.userId = this.userId;
      this.chatService.sendMessageToNewOther(input).then((res: any) => {
        this.thisConversation = res.data.newConversation;
        this.getListConversation();
        this.getListMessage(true, true);
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
        // this.getListConversation();
        // this.getListMessage();
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
    this.loadedFull = false;
    this.maxResultCount = 20
    this.skipCount = 0
    this.thisConversation = conversation;
    this.messages = []
    this.getListMessage(true, true);
    this.seenConversation(conversation.id);
    this.replyMessage = undefined;
    this.getListUserOfConversation(conversation);
  }

  getListUserOfConversation(conversation: any) {
    this.chatService.getUsersByConversation(conversation.id).then((res: any) => {
      this.eventService.changeListConversationUsers(res.data)
    }).catch((err: any) => {
    });
  }

  addConversationSuccess(newConversation: any) {
    this.getListConversation();
    this.thisConversation = newConversation;
    // this.getListMessage();
    this.isVisibleAddConversation = false;
  }

  updateConversationSuccess(conversation: any) {
    this.getListConversation();
    this.thisConversation = conversation;
    this.getListMessage(true, true);
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
  // onBackspace(event: any) {
  //   const textArea = event.target;
  //   const lines = textArea.value.split('\n');
  //   const lastLine = lines[lines.length - 1];
  //   if (lastLine.trim() === '') {
  //     this.inputRows--;
  //   }
  // }

  callVideo() {
    window.open(`https://nice-water-0f00c4810.4.azurestaticapps.net?chanel=${this.thisConversation?.id}&token=${localStorage.getItem("TOKEN")}`, "_blank");
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && event.shiftKey) {
      console.log(1123123);

      this.rows = Math.min(this.rows + 1, this.maxRows);
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
      this.rows = 1;
    } else if (event.key === 'Backspace' && this.contentText !== '') {
      // event.preventDefault();
      // this.removeLastRow();
      const lines = this.contentText.split('\n');
      const lastLine = lines[lines.length - 1];
      if (lastLine.trim() === '') {
        this.rows = Math.max(this.rows - 1, 1);
      }
    }
  }

  handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
    }
  }
  handleChange(): void {
    if (this.contentText === '') {
      this.rows = 1;
    }
  }
  sendMessage(): void {
    // Add your logic to handle the message
    // console.log('Sending message:', this.contentText);

    // Clear the message input
    this.contentText = '';
    // Reset rows to 1 after sending the message
    this.rows = 1;
  }

  removeLastRow(): void {
    if (this.contentText !== '' && this.rows > 1) {

      this.rows = Math.max(this.rows - 1, 1);
    }
  }
  handleReplyMessage(message: any) {
    console.log(message);
    if (message.senderId === this.getDecodedAccessToken().nameid)
      this.replyMe = true
    this.replyMessage = message;
    this.focusToMessageId = message.id
  }
  handleDeleteReplyMessage() {
    this.replyMessage = undefined;
    this.focusToMessageId = ''
  }
}