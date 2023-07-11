import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectStage, RelationWithProject } from 'src/app/model/enum';
import { ProjectDto, GetListProjectForStartuperDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
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
      isActive: [false, []]
    });
    this.getListProject();
  }

  getListProject(reset: boolean = false) {
    if (reset) { this.page = 1; }

  }

  submitSearch() {
    this.getListProject(true);
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

}
