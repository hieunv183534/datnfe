import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  inviteUsers: any[] = [];

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getListInviteMember();
  }

  getListInviteMember() {
    this.projectService.getUsersProjectRequestTo(this.projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Lấy danh sách invited thành công!",
      });
      console.log(res.data);
      this.inviteUsers = res.data.map((x: any) => {
        return {
          name: x.user.name,
          avatarUrl: x.user.avatarUrl,
          key: x.user.email ?? x.user.phone,
          status: true
        };
      });
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách invited thất bại!",
      });
    });
  }

  hide() {
    this.close.emit();
  }

  inviteUser(userId: string) {
    this.projectService.requestToUserFromProject(this.projectId, userId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Invite thành công!",
      });
      this.getListInviteMember();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Invite thất bại!",
      });
    });
  }

  submitSearchUser() {
    this.projectService.getUserByUserNameForInviteToProject(this.keySearchUser, this.projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Tìm thấy user, hãy gửi yêu cầu đến họ nào!",
      });
      this.inviteUsers.unshift({ ...res.data, key: this.keySearchUser , status: false});
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "User không tồn tại hoặc đã có sẵn trong dự án!",
      });
    });
  }

  goToStartuper(){
    this.router.navigate(['./startuper/startuper']);
  }

}
