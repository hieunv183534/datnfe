import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkStatus } from 'src/app/model/enum';
import { AddProjectWorkDto, ProjectWorkDto } from 'src/app/model/project.class';
import { Util } from 'src/app/shared/util/util';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/services/project.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-work',
  templateUrl: './project-work.component.html',
  styleUrls: ['./project-work.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProjectWorkComponent implements OnInit {

  @Input() projectId: string = "";
  newWorks: ProjectWorkDto[] = [];
  inprogressWorks: ProjectWorkDto[] = [];
  doneWorks: ProjectWorkDto[] = [];

  isVisibleAddWork: boolean = false;
  users: any[] = [];

  selectAssignee: any = null;
  title: string = "";
  description: string = "";
  deadline?: Date;
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getListWorks();

    this.projectService.getMembersOfProject(this.projectId).then((res: any) => {
      this.users = res.data.map((x: any) => x.user);
    }).catch((err: any) => {

    });
  }

  getListWorks() {
    this.projectService.getProjectWorks(this.projectId).then((res: any) => {
      this.newWorks = res.data.filter((x: any) => x.status == WorkStatus.New);
      this.inprogressWorks = res.data.filter((x: any) => x.status == WorkStatus.InProgress);
      this.doneWorks = res.data.filter((x: any) => x.status == WorkStatus.Done);
    }).catch((err: any) => {

    });
  }

  getDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }

  drop(event: any, index: number) {
    if (event.previousContainer != event.container) {
      this.projectService.changeWorkStatus(event.previousContainer.data[event.previousIndex].id, index).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật trạng thái công việc thành công!",
        });
        this.getListWorks();
      }).catch((err: any) => {

      });
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  addWork() {
    if (!this.title) {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Tiêu đề công việc không được để trống!",
      });
    } else if (!this.selectAssignee) {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Người nhận việc không được để trống!",
      });
    } else {
      let input = new AddProjectWorkDto();
      input.projectId = this.projectId;
      input.title = this.title;
      input.description = this.description;
      input.assigneeId = this.selectAssignee.id;
      input.deadline = this.deadline;
      this.projectService.addWork(input).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Thêm mới công việc thành công!",
        });
        this.getListWorks();
        this.title = "";
        this.description = "";
        this.deadline = undefined;
        this.selectAssignee = null;
        this.isVisibleAddWork = false;
      }).catch((err: any) => {

      });
    }
  }
}
