import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RoleInProject } from 'src/app/model/enum';
import { StartuperDto } from 'src/app/model/startuper.class';
import { UserDto } from 'src/app/model/user.class';
import { AdminService } from 'src/app/services/admin.service';
import { EventService } from 'src/app/services/event.service';
import { StartuperService } from 'src/app/services/startuper.service';
import { Util, FsiValues } from 'src/app/shared/util/util';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() userId: string = "";
  @Output() close: EventEmitter<any> = new EventEmitter();

  startuperInfo: StartuperDto = {};
  listProject: any[] = [];
  listWork: any[] = [];
  friendStatus: number = 0;
  headerName: string = '';
  handleConnect: boolean = false;
  handleOpenRequest: boolean = false;
  userInfo: any = {};

  projectRoles = ["Nhà đầu tư", "Thành viên", "Đồng sáng lập", "Nhà sáng lập"]
  constructor(
    private startuperService: StartuperService,
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.userInfo = this.getDecodedAccessToken();
    this.startuperService.getUserDetail(this.userId).then((res: any) => {
      this.startuperInfo = res.data.startuperInfo;
      this.friendStatus = res.data.friendStatus;
      this.listProject = res.data.projectAsStartuper;
      if (this.startuperInfo.purpose == 3) {
        this.headerName = 'Danh sách dự án'
      } else if (this.startuperInfo.purpose == 2) {
        this.headerName = 'Ý tưởng tôi quan tâm'
      } else if (this.startuperInfo.purpose == 1) {
        this.headerName = 'Ý tưởng khởi nghiệp của tôi'
      } else {
        this.headerName = 'Dự án tôi quan tâm'
      }
      this.listWork = JSON.parse(this.startuperInfo.workingExperience ?? "[]")
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy thông tin người dùng thất bại. vui lòng thử lại!",
      });
      this.close.emit();
    });
  }

  closeModalOpen(){
    this.handleOpenRequest = false
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }

  closeModal(){
    this.handleConnect = false
  }

  hide() {
    this.close.emit();
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
    return FsiValues.getMultiName(val, FsiValues.fields).split(", ");
  }

  getPersonalities(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.personalities).split(", ");
  }

  getSkills(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.skills).split(", ");
  }

  getSpecializies(val: number[]){
    return FsiValues.getMultiName(val, FsiValues.specializies).split(", ")
  }

  getTargetField(val: number[]){
    return FsiValues.getMultiName(val, FsiValues.fields).split(", ")
  }

  getTargetSpecializies(val: number[]){
    return FsiValues.getMultiName(val, FsiValues.specializies).split(", ")
  }

  getIdeaField(val: number[]){
    return FsiValues.getMultiName(val, FsiValues.fields).split(", ")
  }

  getPurpose(val?: number) {
    return FsiValues.getName(val ?? 0, FsiValues.purposes);
  }

  getField(val?: number) {
    return FsiValues.getName(val ?? 0, FsiValues.fields);
  }

  getYOE(val?: number) {
    return FsiValues.getName(val ?? 0, FsiValues.yearOfExps);
  }

  getDate(d: any) {
    return Util.getDate(new Date(d));
  }

  routeToProfile(value: any){
    this.close.emit();
    this.router.navigate([`./profile/${value}`]);
  }

  requestConnect(){
    this.handleConnect = false
    this.startuperService.requestFriendToOrtherStartuper(this.startuperInfo.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Yêu cầu kết nối thành công!",
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
    this.close.emit();
  }

  connectOnClick() {
    this.handleConnect = true
  }

  cancelOnClick() {
    this.startuperService.cancelRequestToOrtherStartuper(this.startuperInfo.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Hủy yêu cầu kết nối thành công!",
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

  acceptOnClick() {
    this.startuperService.acceptRequestFriendFromOrtherStartuper(this.startuperInfo.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Chấp nhận yêu cầu kết nối thành công!",
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

  chatOnClick() {
    this.router.navigate(['./startuper/chat/1/' + this.userId]);
    this.close.emit();
  }

  deleteOnClick() {
    this.adminService.deleteStartuper(this.startuperInfo.id ?? "").then((res: any) => {
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
