import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';
import { ListProjectFileComponent } from './list-project-file/list-project-file.component';
import { ProjectStage } from 'src/app/model/enum';
import { ProjectCalendarComponent } from './project-calendar/project-calendar.component';
import { ProjectWorkComponent } from './project-work/project-work.component';
import { ProjectEventComponent } from './project-event/project-event.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-project-space',
  templateUrl: './project-space.component.html',
  styleUrls: ['./project-space.component.css']
})
export class ProjectSpaceComponent implements OnInit {
  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;

  isShowAddMember: boolean = false;
  isShowUpdateProject: boolean = false;

  project: any = { extraProperties: {} };

  @Input() popupAdmin: boolean = false;
  @Input() projectId: string = "";


  @ViewChild("listFile") listFile?: ListProjectFileComponent;
  @ViewChild("appCalendar") appCalendar?: ProjectCalendarComponent;
  @ViewChild("appFeed") appFeed?: ProjectEventComponent;
  @ViewChild("appWork") appWork?: ProjectWorkComponent;

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

  isFounder: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private messageService: MessageService
  ) { }

  getArea(val: number) {
    return FsiValues.getName(val, FsiValues.areas);
  }

  getStage(val: ProjectStage) {
    return this.projectStages.find(x => x.value == val)?.name;
  }

  getFields(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.fields);
  }

  ngOnInit() {
    if (this.popupAdmin) {
      this.project.id = this.projectId;
      this.listFile?.getListFile();
      this.projectService.getProjectById(this.projectId).then((res: any) => {
        this.project = res.data;
        this.setIsFounder();
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Lấy thông tin dự án thất bại!",
        });
      });
    } else {
      this.route.params.subscribe(params => {
        let projectId = params["projectId"];
        this.project.id = projectId;
        this.listFile?.getListFile();
        this.projectService.getProjectById(projectId).then((res: any) => {
          this.project = res.data;
          this.setIsFounder();
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

  setIsFounder(){
    let myInfo = this.getDecodedAccessToken();
    this.isFounder = myInfo.nameid == this.project.founder.id;
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }


  changeProjectInfo(newProjectInfo: any) {
    this.project = newProjectInfo;
    this.isShowUpdateProject = false;
  }

  tabChange(event: any) {
    if (event.index == 0) {
      this.appCalendar?.getListEvent();
    } else if (event.index == 1) {
      this.appFeed?.getListEvent();
    } else if (event.index == 2) {

    }
  }
}
