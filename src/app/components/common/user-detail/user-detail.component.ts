import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StartuperDto } from 'src/app/model/startuper.class';
import { UserDto } from 'src/app/model/user.class';
import { StartuperService } from 'src/app/services/startuper.service';
import { Util, FsiValues } from 'src/app/shared/util/util';

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
  projectsAsStartuper: any[] = [];
  friendStatus: number = 0;
  constructor(
    private startuperService: StartuperService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.startuperService.getUserDetail(this.userId).then((res: any) => {
      console.log(res.data);
      this.startuperInfo = res.data.startuperInfo;
      this.friendStatus = res.data.friendStatus
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
    return FsiValues.getMultiName(val, FsiValues.fields);
  }

  getPersonalities(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.personalities).split(", ");
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
}
