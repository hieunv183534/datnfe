import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-top-similar-project',
  templateUrl: './top-similar-project.component.html',
  styleUrls: ['./top-similar-project.component.css']
})
export class TopSimilarProjectComponent implements OnInit, OnChanges {

  @Input() projectId: string = "";

  projects: ProjectDto[] = [];

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTopSimilarProject();
  }

  getTopSimilarProject() {
    debugger
    this.projectService.getTopSimilarProject(this.projectId).then((res: any) => {
      debugger
      this.projects = res.data;
      console.log(this.projects);

    }).catch((err: any) => {

    });
  }

  requestToProject(projectId: string) {
    this.projectService.requestToProject(projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Gửi yêu cầu kết nối thành công!",
      });
      this.getTopSimilarProject();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Thất bại, vui lòng thử lại sau!",
      });
    });
  }

}
