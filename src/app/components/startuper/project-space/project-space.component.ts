import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';
import { ListProjectFileComponent } from './list-project-file/list-project-file.component';
import { ProjectStage } from 'src/app/model/enum';

@Component({
  selector: 'app-project-space',
  templateUrl: './project-space.component.html',
  styleUrls: ['./project-space.component.css']
})
export class ProjectSpaceComponent implements OnInit {
  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;

  isShowAddMember: boolean = false;

  project: any = {extraProperties:{}};

  @ViewChild("listFile") listFile?: ListProjectFileComponent;

  projectStages: any[] = [
    { name: "Xác lập", value: ProjectStage.XacLap },
    { name: "Nghiên cứu", value: ProjectStage.NghienCuu },
    { name: "MVP", value: ProjectStage.MVP },
    { name: "Kiểm thử", value: ProjectStage.KiemThu },
    { name: "Tăng trưởng 1", value: ProjectStage.TangTruong1 },
    { name: "Tăng trưởng 2", value: ProjectStage.TangTruong2 },
    { name: "Tăng trưởng 3", value: ProjectStage.TangTruong3 },
    { name: "Tăng trưởng 4", value: ProjectStage.TangTruong4 }
  ];
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private messageService: MessageService
  ) { }

  getArea(val: number){
    return FsiValues.getName(val, FsiValues.areas);
  }

  getProject(val: ProjectStage){
    return this.projectStages.find(x=> x.value == val).name;
  }

  getFields(val: number[]){
    return FsiValues.getMultiName(val, FsiValues.fields);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let projectId = params["projectId"];
      this.project.id = projectId;
      this.listFile?.getListFile();
      this.projectService.getProjectById(projectId).then((res: any) => {
        this.project = res.data;
        console.log(res.data);
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Lấy thông tin dự án thất bại!",
        });
      });
    });
  }

}
