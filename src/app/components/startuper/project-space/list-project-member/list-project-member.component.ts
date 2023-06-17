import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-project-member',
  templateUrl: './list-project-member.component.html',
  styleUrls: ['./list-project-member.component.css']
})
export class ListProjectMemberComponent implements OnInit, OnChanges {
  @Input() projectId: string = "";
  @Output() addNewMember: EventEmitter<any> = new EventEmitter();
  members: any[] = []

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.getListMembers();
  }

  ngOnInit() {
  }

  getListMembers() {
    this.projectService.getMembersOfProject(this.projectId).then((res: any) => {
      console.log(res.data);
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

}
