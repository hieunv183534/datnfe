import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { UserDto } from 'src/app/model/user.class';
import { EventService } from 'src/app/services/event.service';
import { ProjectService } from 'src/app/services/project.service';
import { Util } from 'src/app/shared/util/util';

@Component({
  selector: 'app-list-project-member',
  templateUrl: './list-project-member.component.html',
  styleUrls: ['./list-project-member.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ListProjectMemberComponent implements OnInit, OnChanges {
  @Input() projectId: string = "";
  @Output() addNewMember: EventEmitter<any> = new EventEmitter();
  @Input() isMyProject: boolean = false;
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

  ngOnChanges(changes: SimpleChanges): void {
    this.getListMembers();
  }

  ngOnInit() {
    this.eventService.currentEvent.subscribe(e => {
      this.getListMembers();
    });
  }
  viewDetail() {
    this.eventService.showUserDetail(this.userSelectId)
  }
  navigateChat() {
    this.router.navigate(['./startuper/chat/1/' + this.userSelectId]);
  }
  getListMembers() {
    this.projectService.getMembersOfProject(this.projectId).then((res: any) => {
      this.members = res.data;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách thành viên thất bại!",
      });
    });
  }

  getDate(d: any) {
    return Util.getDate(new Date(d));
  }

}
