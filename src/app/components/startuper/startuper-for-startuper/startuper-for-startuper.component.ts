import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UuidStartuperModeFromMe, UuidStartuperModeNew, UuidStartuperModeOFMe, UuidStartuperModeToMe } from 'src/app/model/enum';
import { StartuperDto } from 'src/app/model/startuper.class';
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
    private messageService: MessageService,
    private fb: FormBuilder,
    private startuperService: StartuperService
  ) { }

  ngOnInit() {
    this.mySelects = [
      {
        name: "Dành cho bản thân",
        code: 1,
        selects:[
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
        selects:[
          {
            cname: "NKN mới cho FSI Connected",
            code: 21
          },
          {
            cname: "NKN mới cho NOM",
            code: 22
          }
        ]
      }
    ]
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
  }

  submitSearch(){

  }
}
