import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-project-invite-member',
  templateUrl: './list-project-invite-member.component.html',
  styleUrls: ['./list-project-invite-member.component.css']
})
export class ListProjectInviteMemberComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() projectId: string = "";
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  keySearchUser: string = "";

  inviteUsers: any[] = [
    {
      avatarUrl: "http://localhost:7777/images/525a6015-6ee2-4d33-a924-e586ec53c308.png",
      name: "Nguyễn Văn Hiếu",
      key: "0971883025",
      status: false
    }
  ];

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  hide() {
    this.close.emit();
  }

  submitSearchUser() {
    this.projectService.getUserByUserNameForInviteToProject(this.keySearchUser, this.projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Tìm thấy user, hãy gửi yêu cầu đến họ nào!",
      });
      this.inviteUsers.unshift(res.data);
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "User không tồn tại hoặc đã có sẵn trong dự án!",
      });
    });
  }

}
