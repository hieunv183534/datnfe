import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GetListProjectForAdminDto } from 'src/app/model/admin.class';
import { ProjectStage, RelationWithProject } from 'src/app/model/enum';
import { ProjectDto, GetListProjectForStartuperDto } from 'src/app/model/project.class';
import { AdminService } from 'src/app/services/admin.service';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ListProjectComponent implements OnInit {

  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;

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

  isActiveSelects: any[] = [
    { name: "Mới", value: false },
    { name: "Đã duyệt", value: true }
  ];

  RelationWithProject = RelationWithProject;


  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  listProject: ProjectDto[] = []

  isVisibleAddProject: boolean = false;
  display: boolean = false;

  displayProjectDetail: boolean = false;

  projectId: string = "";
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      filter: [null, []],
      fields: [[], []],
      areas: [[], []],
      stages: [[], []],
      isActive: [false, []]
    });
    this.getListProject();
  }

  getListProject(reset: boolean = false) {
    if (reset) { this.page = 1; }
    let input = new GetListProjectForAdminDto();
    input.areas = this.formSearch.value.areas ?? [];
    input.fields = this.formSearch.value.fields ?? [];
    input.filter = this.formSearch.value.filter;
    input.stages = this.formSearch.value.stages ?? [];
    input.isActive = this.formSearch.value.isActive;
    input.skipCount = (this.page - 1) * this.pageSize;
    input.maxResultCount = this.pageSize;
    this.adminService.getListProjectForAdmin(input).then((res: any) => {
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

  viewProject(projectId: string){
    this.projectId = projectId;
    this.displayProjectDetail = true;
  }

  approveProject(){

  }

  clearSearch() {
    this.formSearch.controls["filter"].patchValue(null);
    this.formSearch.controls["fields"].patchValue([]);
    this.formSearch.controls["areas"].patchValue([]);
    this.formSearch.controls["stages"].patchValue([]);
    this.page = 1;
    this.pageSize = 10;
    this.getListProject(true);
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
  }


  acceptProject(projectId: string) {
    this.adminService.acceptProject(projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Duyệt dự án/ý tưởng thành công!",
      });
      this.displayProjectDetail = false;
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

  deleteProject(projectId: string) {
    this.adminService.deleteProject(projectId).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Xóa dự án/ý tưởng thành công!",
      });
      this.displayProjectDetail = false;
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
