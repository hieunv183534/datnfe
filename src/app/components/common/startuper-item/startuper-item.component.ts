import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UuidStartuperModeAdmin, UuidStartuperModeFromMe, UuidStartuperModeNew, UuidStartuperModeOFMe, UuidStartuperModeToMe } from 'src/app/model/enum';
import { StartuperDto } from 'src/app/model/startuper.class';
import { AdminService } from 'src/app/services/admin.service';
import { EventService } from 'src/app/services/event.service';
import { FsiValues, Util } from 'src/app/shared/util/util';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';


@Component({
  selector: 'app-startuper-item',
  templateUrl: './startuper-item.component.html',
  styleUrls: ['./startuper-item.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StartuperItemComponent implements OnInit {

  @Input() startuper: StartuperDto = {}

  @Input() userInfo : any

  @Input() mode: any = UuidStartuperModeNew;

  isHovered: boolean = false;

  UuidStartuperModeNew = UuidStartuperModeNew;
  UuidStartuperModeOFMe = UuidStartuperModeOFMe;
  UuidStartuperModeFromMe = UuidStartuperModeFromMe;
  UuidStartuperModeToMe = UuidStartuperModeToMe;
  UuidStartuperModeAdmin = UuidStartuperModeAdmin;

  handleConnect: boolean = false;
  handleOpenRequest: boolean = false;
  isNewProfile: boolean = false;

  @Output() requestFriend: EventEmitter<any> = new EventEmitter();
  @Output() acceptFriend: EventEmitter<any> = new EventEmitter();
  @Output() cancelRequestFriend: EventEmitter<any> = new EventEmitter();
  @Output() requestFromProject: EventEmitter<any> = new EventEmitter();



  constructor(
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute,

  ) { 
   
    
    
  }

  ngOnInit() {
    this.isNewProfile = JSON.parse(localStorage.getItem("IS_NEW_PROFILE")??'false');
  }

  closeModal(){
    this.handleConnect = false
  }

  closeModalOpen(){
    this.handleOpenRequest = false
  }

  openRequest(){
    this.handleOpenRequest = true
  }

  getAge(dob: any) {
    return Util.getAge(dob);
  }

  getDate(dob: any){
    return Util.getDate(new Date(dob));
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

  requestFriendOnClick() {
    this.handleConnect = true
  }

  requestConnect(){
    this.requestFriend.emit(this.startuper);
    this.handleConnect = false
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
  updateProfile() {
    let currentUserId = this.getDecodedAccessToken().nameid;
    this.router.navigate(['/profile/' + currentUserId]);
  }
  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
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
