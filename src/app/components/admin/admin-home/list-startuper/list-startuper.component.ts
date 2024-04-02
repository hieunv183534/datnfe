import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GetListStartuperForAdminDto } from 'src/app/model/admin.class';
import { UuidStartuperModeAdmin } from 'src/app/model/enum';
import { StartuperDto, GetListStartuperForProjectDto } from 'src/app/model/startuper.class';
import { UserDto } from 'src/app/model/user.class';
import { AdminService } from 'src/app/services/admin.service';
import { EventService } from 'src/app/services/event.service';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-list-startuper',
  templateUrl: './list-startuper.component.html',
  styleUrls: ['./list-startuper.component.css'],


})
export class ListStartuperComponent implements OnInit {

  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;
  personalities: any = FsiValues.personalities;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;
  display: boolean = false;
  listStartuper: StartuperDto[] = [];

  formSearch: FormGroup = this.fb.group({});

  page: number = 1;
  pageSize: number = 12;
  pageSizeOptions: any[] = [12, 24, 36, 48, 72];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  mySelects: any[] = [];
  userSelect: UserDto = {};

  UuidStartuperModeAdmin = UuidStartuperModeAdmin;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private projectService: ProjectService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.currentReloadStartuper.subscribe(reload => {
      if (reload != "FSI") {
        this.getListStartuper();
      }
    });

    this.formSearch = this.fb.group({
      filter: [null, []],
      fields: [[], []],
      areas: [[], []]
    });
    this.getListStartuper();
  }

  getListStartuper(reset: boolean = false) {
    if (reset) { this.page = 1; }
    let input = new GetListStartuperForAdminDto();
    input.areas = this.formSearch.value.areas ?? [];
    input.fields = this.formSearch.value.fields ?? [];
    input.filter = this.formSearch.value.filter;
    input.skipCount = (this.page - 1) * this.pageSize;
    input.maxResultCount = this.pageSize;
    this.adminService.getListStartuperForAdmin(input).then((res: any) => {
      this.totalRecords = res.data.totalCount;
      this.listStartuper = res.data.items;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách nkn thất bại, vui lòng thử lại!",
      });
    });
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
    this.getListStartuper(false);
  }

  submitSearch() {
    this.getListStartuper(true);
  }

  clearSearch() {
    this.formSearch.controls["filter"].patchValue(null);
    this.formSearch.controls["fields"].patchValue([]);
    this.formSearch.controls["areas"].patchValue([]);
    this.page = 1;
    this.pageSize = 12;
    this.getListStartuper(true);
  }

}
