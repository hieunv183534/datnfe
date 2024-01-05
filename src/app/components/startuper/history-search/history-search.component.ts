import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartuperService } from 'src/app/services/startuper.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectStage, RelationWithProject } from 'src/app/model/enum';
import { GetListProjectForStartuperDto, ProjectDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css']
})
export class HistorySearchComponent implements OnInit {
    fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;

  formSearch: FormGroup = this.fb.group({});

  profile: any = [
    { name: "Hồ sơ bạn đã xem", value: 0},
    { name: "Hồ sơ cá nhân", value: 1 },
    { name: "Hồ sơ dự án", value: 2 }
  ];

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  typeSearch: number = 1; 

  listProject: ProjectDto[] = []

  isVisibleAddProject: boolean = false;
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private startuperService: StartuperService,
  ) { }

  menus = [{ href: "/startuper/project", title: "Dự án / Ý tưởng" }, { href: "/startuper/startuper/f6b77754-97c0-405f-86a5-f3f4959e2f3a", title: "Nhà khởi nghiệp" }]

  isVisibleRegisterInfo: boolean = false;

  ngOnInit() {
    this.formSearch = this.fb.group({
      filter: [null, []],
      fields: [[], []],
      areas: [[], []],
      profile: [[], []],
      availableTimes: [[], []],
      relationWithProject: [RelationWithProject.NotMemberOfProject, []]
    });
    this.startuperService.getCheckIsNewProfile().then((res: any) => {
      this.isVisibleRegisterInfo = res.data;
    }).catch((err: any) => {

    });
  }

  searchTuKhoa(){
    this.formSearch.controls["profile"].patchValue([0]);
    this.typeSearch = 1
  }

  searchHoSo(){
    this.formSearch.controls["areas"].patchValue([]);
    this.typeSearch = 2
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
      debugger
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
