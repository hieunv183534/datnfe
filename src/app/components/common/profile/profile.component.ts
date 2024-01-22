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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() userId: string = "";
  @Output() close: EventEmitter<any> = new EventEmitter();

  startuperInfo: StartuperDto = {};
  listProject: any[] = [];
  friendStatus: number = 0;
  isShowUpdateInfo: boolean = false;
  menus = [{ href: "/startuper/project", title: "Dự án / Ý tưởng" }, { href: "/startuper/startuper/f6b77754-97c0-405f-86a5-f3f4959e2f3a", title: "Nhà khởi nghiệp" }]

  projectRoles = ["Nhà đầu tư", "Thành viên", "Đồng sáng lập", "Nhà sáng lập"]
  constructor(
    private startuperService: StartuperService,
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  editProfile(){
    this.isShowUpdateInfo = true
  }
}
