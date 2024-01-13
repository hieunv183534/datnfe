import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectStage, RelationWithProject } from 'src/app/model/enum';
import { GetListProjectForStartuperDto, ProjectDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-project-for-startuper',
  templateUrl: './project-for-startuper.component.html',
  styleUrls: ['./project-for-startuper.component.css']
})
export class ProjectForStartuperComponent implements OnInit {

  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;

  formSearch: FormGroup = this.fb.group({});

  projectStages: any = [
    { name: "Xác lập", value: ProjectStage.XacLap },
    { name: "Nghiên cứu", value: ProjectStage.NghienCuu },
    { name: "MVP", value: ProjectStage.MVP },
    { name: "Kiểm thử", value: ProjectStage.KiemThu },
    { name: "Tăng trưởng 1", value: ProjectStage.TangTruong1 },
    { name: "Tăng trưởng 2", value: ProjectStage.TangTruong2 },
    { name: "Tăng trưởng 3", value: ProjectStage.TangTruong3 },
    { name: "Tăng trưởng 4", value: ProjectStage.TangTruong4 }
  ];

  relationWithProjects: any = [
    { name: "Dự án đã tham gia", value: RelationWithProject.IsMemberOfProject },
    { name: "Dự án mới", value: RelationWithProject.NotMemberOfProject },
    { name: "Dự án mời kết nối tới bạn", value: RelationWithProject.ProjectRequestTo },
    { name: "Dự án bạn đã yêu cầu kết nối", value: RelationWithProject.RequestToProject },
  ]

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  listProject: ProjectDto[] = []

  isVisibleAddProject: boolean = false;
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      filter: [null, []],
      fields: [[], []],
      areas: [[], []],
      stages: [[], []],
      availableTimes: [[], []],
      relationWithProject: [RelationWithProject.NotMemberOfProject, []]
    });
    this.getListProject();
  }

  getListProject(reset: boolean = false) {
    if (reset) { this.page = 1; }
    let input = new GetListProjectForStartuperDto();
    input.areas = this.formSearch.value.areas ?? [];
    input.fields = this.formSearch.value.fields ?? [];
    input.filter = this.formSearch.value.filter;
    input.stages = this.formSearch.value.stages ?? [];
    input.availableTimes = this.formSearch.value.availableTimes ?? [];
    input.relationWithProject = this.formSearch.value.relationWithProject;
    input.skipCount = (this.page - 1) * this.pageSize;
    input.maxResultCount = this.pageSize;
    this.projectService.getListProjectForStartuper(input).then((res: any) => {
      this.totalRecords = res.data.totalCount;
      this.listProject = res.data.items;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách dự án thất bại, vui lòng thử lại!",
      });
    });
  }

  submitSearch() {
    this.getListProject(true);
  }

  clearSearch() {
    this.formSearch.controls["filter"].patchValue(null);
    this.formSearch.controls["fields"].patchValue([]);
    this.formSearch.controls["areas"].patchValue([]);
    this.formSearch.controls["stages"].patchValue([]);
    this.formSearch.controls["availableTimes"].patchValue([]);
    this.page = 1;
    this.pageSize = 10;
    this.getListProject(true);
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
    this.getListProject(true);
  }


  requestToProject(projectId: string) {
    this.projectService.requestToProject(projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Gửi yêu cầu kết nối thành công!",
      });
      this.getListProject();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Thất bại, vui lòng thử lại sau!",
      });
    });
  }

  acceptRequestFromProject(projectId: string) {
    this.projectService.acceptRequestFromAProject(projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Chấp nhận kết nối thành công!",
      });
      this.getListProject();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Thất bại, vui lòng thử lại sau!",
      });
    });
  }

  cancelRequestToProject(projectId: string) {
    this.projectService.cancelRequestToAProject(projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Hủy yêu cầu kết nối thành công!",
      });
      this.getListProject();
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
