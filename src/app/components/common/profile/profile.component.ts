import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() userId: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  startuperInfo: StartuperDto = {};
  listProject: any[] = [];
  listWork: any[] = [];
  friendStatus: number = 0;
  isShowUpdateInfo: boolean = false;
  display: boolean = false;
  userInfo: any = {};
  isChangeStyle: boolean = false;
  headerName: string = '';
  menus = [{ href: "/startuper/project", title: "Tìm kiếm dự án" }, { href: "/startuper/startuper/f6b77754-97c0-405f-86a5-f3f4959e2f3a", title: "Tìm kiếm Co-founder" }]

  projectRoles = ["Nhà đầu tư", "Thành viên", "Đồng sáng lập", "Nhà sáng lập"]
  constructor(
    private startuperService: StartuperService,
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) { }

  async ngOnInit() {
    this.startuperService.getCheckIsNewProfile().then((res: any) => {
      let currentUserId = this.getDecodedAccessToken().nameid;
      if (res.data) {
        this.display= true;
      }
    }).catch((err: any) => {

    });

    this.userInfo = this.getDecodedAccessToken();
    this.userId = this.route.snapshot.paramMap.get('id')
    await this.startuperService.getUserDetail(this.userId).then((res: any) => {
      this.startuperInfo = res.data.startuperInfo;
      this.friendStatus = res.data.friendStatus;
      this.listProject = res.data.projectAsStartuper;
      this.listWork = JSON.parse(this.startuperInfo.workingExperience ?? "[]")
      if (this.startuperInfo.purpose == 3) {
        this.headerName = 'Danh sách dự án'
      } else if (this.startuperInfo.purpose == 2) {
        this.headerName = 'Ý tưởng tôi quan tâm'
      } else if (this.startuperInfo.purpose == 1) {
        this.headerName = 'Ý tưởng khởi nghiệp của tôi'
      } else {
        this.headerName = 'Dự án tôi quan tâm'
      }
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy thông tin người dùng thất bại. vui lòng thử lại!",
      });
    });

    if (this.userId == this.userInfo.nameid) {
      this.isChangeStyle = false
    } else {
      this.isChangeStyle = true
    }
  }

  closeModal() {
    this.isShowUpdateInfo = false;
    this.startuperService.getCheckIsNewProfile().then((res: any) => {
      localStorage.setItem("IS_NEW_PROFILE", res.data);
    }).catch((err: any) => {
      localStorage.setItem("IS_NEW_PROFILE", 'false');
    });

    this.startuperService.getUserDetail(this.userId).then((res: any) => {
      this.startuperInfo = res.data.startuperInfo;
      this.friendStatus = res.data.friendStatus;
      this.listProject = res.data.projectAsStartuper;
      this.listWork = JSON.parse(this.startuperInfo.workingExperience ?? "[]")
      if (this.startuperInfo.purpose == 3) {
        this.headerName = 'Danh sách dự án'
      } else if (this.startuperInfo.purpose == 2) {
        this.headerName = 'Ý tưởng tôi quan tâm'
      } else if (this.startuperInfo.purpose == 1) {
        this.headerName = 'Ý tưởng khởi nghiệp của tôi'
      } else {
        this.headerName = 'Dự án tôi quan tâm'
      }
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy thông tin người dùng thất bại. vui lòng thử lại!",
      });
    });
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

  getSpecializies(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.specializies).split(", ")
  }

  getTargetField(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.fields).split(", ")
  }

  getTargetSpecializies(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.specializies).split(", ")
  }

  getIdeaField(val: number[]) {
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

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }

  editProfile() {
    this.isShowUpdateInfo = true
  }
}
