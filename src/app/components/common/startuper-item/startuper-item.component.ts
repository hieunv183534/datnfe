import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UuidStartuperModeFromMe, UuidStartuperModeNew, UuidStartuperModeOFMe, UuidStartuperModeToMe } from 'src/app/model/enum';
import { StartuperDto } from 'src/app/model/startuper.class';
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

  @Output() requestFriend: EventEmitter<any> = new EventEmitter();
  @Output() acceptFriend: EventEmitter<any> = new EventEmitter();
  @Output() cancelRequestFriend: EventEmitter<any> = new EventEmitter();
  @Output() requestFromProject: EventEmitter<any> = new EventEmitter();



  constructor(
    private eventService: EventService
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
    return FsiValues.getMultiName(val, FsiValues.skills);
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
    alert("open chat");
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

}
