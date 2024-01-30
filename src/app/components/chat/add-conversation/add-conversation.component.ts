import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { StartuperService } from 'src/app/services/startuper.service';
import jwt_decode from 'jwt-decode';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-add-conversation',
  templateUrl: './add-conversation.component.html',
  styleUrls: ['./add-conversation.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddConversationComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() addSuccess: EventEmitter<any> = new EventEmitter();

  // status user-conversation: 0: mới; 1: bản thân; 2: đã tham gia; 3: đã mời;

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
    let currentUser = this.getDecodedAccessToken();
    this.inviteUsers = [{
      id: currentUser.nameid,
      name: currentUser.name,
      avatarUrl: currentUser.avatarUrl,
      status: 1
    }]
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
    this.inviteUsers = this.inviteUsers.filter(x => x.id != user.id);
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
    } else if (this.inviteUsers.filter(x => x.status != 0).length == 1) {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Phải có ít nhất hai thành viên!",
      });
    } else if (!this.croppedImage) {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Chưa có ảnh đại diện!",
      });
    } else {
      var userIds = this.inviteUsers.filter(x => x.status != 0).map(x => x.id);
      let file = new File([this.blob], '1.png');
      this.chatService.addConversation(this.conversationName, userIds, "", file).then((res: any) => {
        this.addSuccess.emit(res.data);
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Thêm nhóm chat thất bại, vui lòng thử lại!",
        });
      });
    }
  }

}
