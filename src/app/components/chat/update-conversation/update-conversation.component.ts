import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { ChatService } from 'src/app/services/chat.service';
import { StartuperService } from 'src/app/services/startuper.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-update-conversation',
  templateUrl: './update-conversation.component.html',
  styleUrls: ['./update-conversation.component.css']
})
export class UpdateConversationComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() conversation: any = {};
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() updateSuccess: EventEmitter<any> = new EventEmitter();

  // status user-conversation: 0: mới; 1: bản thân; 2: đã tham gia;

  tabIndex: number = 0;

  keySearchUser: string = "";
  inviteUsers: any[] = [];
  conversationName: string = "";
  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private startuperService: StartuperService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.croppedImage = this.conversation.conversationAvatar;
    this.conversationName = this.conversation.conversationName;

    this.getListUserOfConversation();

  }

  getListUserOfConversation() {
    let currentUserId = this.getDecodedAccessToken().nameid;
    this.chatService.getUsersByConversation(this.conversation.id).then((res: any) => {
      this.inviteUsers = res.data.map((x: any) => {
        let user = x.user;
        if (user.id == currentUserId || x.RoleInConversation == 0)
          user.status = 1;
        else user.status = 2
        user.key = user.phone;
        return user;
      });
    }).catch((err: any) => {

    });
  }

  tabChange(event: any) {
    this.tabIndex = event.index;
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }
  submitSearchUser() {
    this.startuperService.getUserByUsername(this.keySearchUser).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Tìm thấy user, hãy mời họ vào nhóm!",
      });
      let find = this.inviteUsers.find(x => x.id == res.data.id);
      if (!find) {
        this.inviteUsers.unshift({ ...res.data, key: this.keySearchUser, status: 0 });
      }
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "User không tồn tại!",
      });
    });
  }

  removeUser(user: any) {
    if (user.status == 0) {
      this.inviteUsers = this.inviteUsers.filter(x => x.id != user.id);
    }else{
      this.chatService.removeUserFromConversation(user.id,this.conversation.id).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "succcess",
          summary: "Thành công",
          detail: "Thêm thành viên vào nhóm chat thành công!",
        });
        this.getListUserOfConversation();
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Thất bại",
          detail: "Xóa thành viên khỏi nhóm chat thất bại!",
        });
      });
    }
  }

  addUser(user: any) {
    this.chatService.addUserToConversation(user.id, this.conversation.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "succcess",
        summary: "Thành công",
        detail: "Thêm thành viên vào nhóm chat thành công!",
      });
      this.getListUserOfConversation();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Thất bại",
        detail: "Thêm thành viên vào nhóm chat thất bại!",
      });
    });
  }

  @ViewChild(ImageCropperComponent) imageCropper?: ImageCropperComponent;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  blob: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.blob = event.blob;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl ?? "");
  }

  imageLoaded(image: LoadedImage) {
    console.log("imageLoaded");
  }
  cropperReady() {
    console.log("cropperReady");
  }
  loadImageFailed() {
    console.log("loadImageFailed");
  }

  save() {
    if (!this.conversationName) {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Tên nhóm chat không được để trống!",
      });
    } else {
      let file: any = null;
      if (this.blob) {
        file = new File([this.blob], '1.png');
        this.croppedImage = "";
      }

      this.chatService.updateConversation(this.conversation.id, this.conversationName, this.croppedImage, file).then((res: any) => {
        this.updateSuccess.emit(res.data);
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Cập nhật tt nhóm chat thất bại, vui lòng thử lại!",
        });
      });
    }
  }

}
