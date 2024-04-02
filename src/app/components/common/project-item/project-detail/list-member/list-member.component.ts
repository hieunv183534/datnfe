import { EventService } from './../../../../../services/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { Util } from 'src/app/shared/util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent implements OnInit {

  @Input() projectId: string = '';
  members: any[] = [];

  userSelectId: string = "";

  items: MenuItem[] = [
    {
      label: "Xem chi tiết",
      icon: "pi pi-id-card",
      command: () => {
        this.eventService.showUserDetail(this.userSelectId)
      }
    },
    {
      label: "Trò chuyện",
      icon: "pi pi-comments",
      command: () => {
        this.router.navigate(['./startuper/chat/1/' + this.userSelectId]);
      }
    }
  ];


  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router

  ) { }

  ngOnInit() {
    this.getListMembers();
  }
  getListMembers() {
    this.projectService.getMembersOfProject(this.projectId).then((res: any) => {
      this.members = res.data;
      console.log(this.members);
      
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách thành viên thất bại!",
      });
    });
  }

  viewDetail() {
    this.eventService.showUserDetail(this.userSelectId)
  }

  getDate(d: any) {
    return Util.getDate(new Date(d));
  }
  navigateChat() {
    this.router.navigate(['./startuper/chat/1/' + this.userSelectId]);
  }
}
