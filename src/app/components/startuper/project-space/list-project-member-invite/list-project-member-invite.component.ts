import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { EventService } from 'src/app/services/event.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-project-member-invite',
  templateUrl: './list-project-member-invite.component.html',
  styleUrls: ['./list-project-member-invite.component.css']
})
export class ListProjectMemberInviteComponent implements OnInit, OnChanges {

  @Input() projectId: string = "";
  members: any[] = []
  items: MenuItem[] = [];
  userId: any = "";
  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private eventService: EventService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getListUserRequestToProject();
  }

  ngOnInit() {
    this.items = [
      {
        label: "Xem chi tiết",
        icon: "pi pi-id-card"
      },
      {
        label: "Chấp nhận",
        icon: "pi pi-check",
        command: () => {
          this.projectService.acceptMemberToProject(this.projectId, this.userId).then((res: any) => {
            this.messageService.add({
              key: "toast",
              severity: "success",
              summary: "Thành công",
              detail: "Chấp nhận thành công, dự án có thêm thành viên mới!",
            });
            this.getListUserRequestToProject();
            this.eventService.changeEvent("");
          }).catch((err: any) => {
            this.messageService.add({
              key: "toast",
              severity: "error",
              summary: "Lỗi",
              detail: "Thao tác thất bại, vui lòng thử lại!",
            });
          });
        }
      },
      {
        label: "Từ chối",
        icon: "pi pi-times",
        command: () => {
          this.projectService.refuseMemberToProject(this.projectId, this.userId).then((res: any) => {
            this.messageService.add({
              key: "toast",
              severity: "success",
              summary: "Thành công",
              detail: "Từ chối thành công!",
            });
            this.getListUserRequestToProject();
          }).catch((err: any) => {
            this.messageService.add({
              key: "toast",
              severity: "error",
              summary: "Lỗi",
              detail: "Thao tác thất bại, vui lòng thử lại!",
            });
          });
        }
      }
    ]
  }

  getListUserRequestToProject() {
    this.projectService.getUsersRequestToProject(this.projectId).then((res: any) => {
      this.members = res.data;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách yêu cầu thất bại!",
      });
    });
  }

}
