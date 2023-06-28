import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UuidStartuperModeFromMe, UuidStartuperModeNew, UuidStartuperModeOFMe, UuidStartuperModeToMe } from 'src/app/model/enum';
import { GetListStartuperForProjectDto, StartuperDto } from 'src/app/model/startuper.class';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-startuper-for-startuper',
  templateUrl: './startuper-for-startuper.component.html',
  styleUrls: ['./startuper-for-startuper.component.css']
})
export class StartuperForStartuperComponent implements OnInit {
  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;
  personalities: any = FsiValues.personalities;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;

  listStartuper: StartuperDto[] = [];

  formSearch: FormGroup = this.fb.group({});

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  mySelects: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private startuperService: StartuperService
  ) { }

  ngOnInit() {
    this.formSearch = this.fb.group({
      filter: [null, []],
      fields: [[], []],
      areas: [[], []],
      availableTimes: [[], []],
      skills: [null, []],
      personalities: [[], []],
      yearOfExps: [[], []],
      mode: [UuidStartuperModeNew, []]
    });

    this.mySelects = [
      {
        name: "Dành cho bản thân",
        code: 1,
        selects: [
          {
            cname: "NKN mới cho tôi",
            code: UuidStartuperModeNew
          },
          {
            cname: "NKN đã kết nối",
            code: UuidStartuperModeOFMe
          },
          {
            cname: "NKN đã gửi yêu cầu kết nối",
            code: UuidStartuperModeFromMe
          },
          {
            cname: "NKN gửi yêu cầu kết nối tới bạn",
            code: UuidStartuperModeToMe
          }
        ]
      },
      {
        name: "Nhà khởi nghiệp dành cho dự án",
        code: 2,
        selects: []
      }
    ];

    this.startuperService.getMyProjects().then((res: any) => {
      this.mySelects[1].selects = res.data.map((x: any) => {
        return {
          code: x.project.id,
          cname: "Dành cho dự án " + x.project.projectName
        };
      });
      this.route.params.subscribe(params => {
        let mode = params["mode"];
        this.formSearch.controls["mode"].patchValue(mode);
      });
      this.getListStartuper(true);
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách dự án của tôi thất bại!",
      });
    });

  }

  getListStartuper(reset: boolean = false) {
    if (reset) { this.page = 1; }
    let input = new GetListStartuperForProjectDto();
    input.areas = this.formSearch.value.areas ?? [];
    input.fields = this.formSearch.value.fields ?? [];
    input.filter = this.formSearch.value.filter;
    input.personalities = this.formSearch.value.personalities ?? [];
    input.availableTimes = this.formSearch.value.availableTimes ?? [];
    input.skills = this.formSearch.value.skills ?? [];
    input.yearOfExps = this.formSearch.value.yearOfExps ?? [];
    input.mode = this.formSearch.value.mode;
    input.skipCount = (this.page - 1) * this.pageSize;
    input.maxResultCount = this.pageSize;
    this.startuperService.getListStartuper(input).then((res: any) => {
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
  }

  submitSearch() {
    this.getListStartuper(true);
  }

  clearSearch() {
    this.formSearch.controls["filter"].patchValue(null);
    this.formSearch.controls["fields"].patchValue([]);
    this.formSearch.controls["areas"].patchValue([]);
    this.formSearch.controls["availableTimes"].patchValue([]);
    this.formSearch.controls["skills"].patchValue([]);
    this.formSearch.controls["yearOfExps"].patchValue([]);
    this.formSearch.controls["mode"].patchValue(UuidStartuperModeNew);
    this.page = 1;
    this.pageSize = 10;
    this.getListStartuper(true);
  }
}
