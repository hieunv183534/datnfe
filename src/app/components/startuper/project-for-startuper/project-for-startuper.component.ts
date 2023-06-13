import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectStage } from 'src/app/model/enum';
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
      field: [null, []],
      area: [null, []],
      stage: [null, []],
      availableTime: [null, []],
      isMyProject: [null, []]
    })
  }

  getListProject(reset: boolean = false) {
    if (reset) { this.page = 1; }
    let input = new GetListProjectForStartuperDto();
    input.area = this.formSearch.value.area;
    input.field = this.formSearch.value.field;
    input.filter = this.formSearch.value.filter;
    input.stage = this.formSearch.value.stage;
    input.availableTime = this.formSearch.value.availableTime;
    input.isMyProject = this.formSearch.value.isMyProject;
    input.skipCount = (this.page - 1) * this.pageSize;
    input.maxResultCount = this.pageSize;
    this.projectService.getListProjectForStartuper(input).then((res: any) => {
      this.totalRecords = res.totalCount;
      this.listProject = res.items;
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
    this.formSearch.controls["field"].patchValue(null);
    this.formSearch.controls["area"].patchValue(null);
    this.formSearch.controls["stage"].patchValue(null);
    this.formSearch.controls["availableTime"].patchValue(null);
    this.page = 1;
    this.pageSize = 10;
    this.getListProject(true);
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
  }

}
