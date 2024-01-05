import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UuidStartuperModeAdmin, UuidStartuperModeFromMe, UuidStartuperModeNew, UuidStartuperModeOFMe, UuidStartuperModeToMe } from 'src/app/model/enum';
import { StartuperDto } from 'src/app/model/startuper.class';
import { AdminService } from 'src/app/services/admin.service';
import { EventService } from 'src/app/services/event.service';
import { FsiValues, Util } from 'src/app/shared/util/util';

@Component({
  selector: 'app-startuper-item',
  templateUrl: './startuper-item.component.html',
  styleUrls: ['./startuper-item.component.css']
})
export class StartuperItemComponent implements OnInit {

  @Input() startuper: StartuperDto = {}

  @Input() mode: any = UuidStartuperModeNew;

  isHovered: boolean = false;

  UuidStartuperModeNew = UuidStartuperModeNew;
  UuidStartuperModeOFMe = UuidStartuperModeOFMe;
  UuidStartuperModeFromMe = UuidStartuperModeFromMe;
  UuidStartuperModeToMe = UuidStartuperModeToMe;
  UuidStartuperModeAdmin = UuidStartuperModeAdmin;

  @Output() requestFriend: EventEmitter<any> = new EventEmitter();
  @Output() acceptFriend: EventEmitter<any> = new EventEmitter();
  @Output() cancelRequestFriend: EventEmitter<any> = new EventEmitter();
  @Output() requestFromProject: EventEmitter<any> = new EventEmitter();



  constructor(
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  getAge(dob: any) {
    return Util.getAge(dob);
  }

  getArea(val?: number) {
    return FsiValues.getName(val ?? 0, FsiValues.areas);
  }

  getAvailableTime(val?: number) {
    return FsiValues.getName(val ?? 0, FsiValues.availableTimes);
  }

  getFields(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.fields);
  }

  getPersonalities(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.personalities);
  }

  getSkills(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.skills).split(", ");
  }

  getField(val?: number) {
    return FsiValues.getName(val ?? 0, FsiValues.fields);
  }

  getYOE(val?: number) {
    return FsiValues.getName(val ?? 0, FsiValues.yearOfExps);
  }

  requestFriendOnClick() {
    this.requestFriend.emit(this.startuper);
  }

  requestFromProjectOnClick() {
    this.requestFromProject.emit(this.startuper);
  }

  openChatOnClick() {
    this.router.navigate(['./startuper/chat/1/' + this.startuper.id]);
  }

  cancelRequestOnClick() {
    this.cancelRequestFriend.emit(this.startuper);
  }

  acceptRequestOnClick() {
    this.acceptFriend.emit(this.startuper);
  }

  showUserDetail() {
    this.eventService.showUserDetail(this.startuper.id ?? "FSI");
  }

  deleteOnClick() {
    this.adminService.deleteStartuper(this.startuper.id??"").then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Xóa tài khoản này thành công!",
      });
      this.eventService.reloadStartuper("");
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Thất bại, vui lòng thử lại sau!",
      });
    });
  }

}
