import { EventService } from 'src/app/services/event.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UuidStartuperModeFromMe, UuidStartuperModeNew, UuidStartuperModeOFMe, UuidStartuperModeToMe } from 'src/app/model/enum';
import { GetListStartuperForProjectDto, StartuperDto } from 'src/app/model/startuper.class';
import { UserDto } from 'src/app/model/user.class';
import { ProjectService } from 'src/app/services/project.service';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-startuper-for-startuper',
  templateUrl: './startuper-for-startuper.component.html',
  styleUrls: ['./startuper-for-startuper.component.css']
})
export class StartuperForStartuperComponent implements OnInit, OnDestroy {
  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;
  personalities: any = FsiValues.personalities;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;

  universities: any[] = FsiValues.universities.map(x => {
    return {
      value: x.universityName,
      name: x.universityName
    }
  });

  universitySpecializeds?: any[] = FsiValues.universities[0].specializeds?.map(x => {
    return {
      value: x,
      name: x
    }
  });

  listStartuper: StartuperDto[] = [];

  formSearch: FormGroup = this.fb.group({});

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  mySelects: any[] = [];
  userSelect: UserDto = {};

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private startuperService: StartuperService,
    private projectService: ProjectService,
    private eventService: EventService,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get f() { return this.formSearch.controls; }

  ngOnInit() {
    this.eventService.currentReloadStartuper.subscribe(reload => {
      if (reload != "FSI") {
        this.getListStartuper();
      }
    });

    this.formSearch = this.fb.group({
      filter: [null, []],
      fields: [[], []],
      areas: [[], []],
      availableTimes: [[], []],
      skills: [null, []],
      personalities: [[], []],
      yearOfExps: [[], []],
      mode: [UuidStartuperModeNew, []],
      isStudent: [false, []],
      university: [null, []],
      universitySpecialized: [null, []],
      studentId: [null, []]
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
      debugger;
      this.mySelects[1].selects = res.data.map((x: any) => {
        return {
          code: x.project.id,
          cname: "Dành cho dự án " + x.project.projectName
        };
      });
      var obs = this.route.params.subscribe(params => {
        let mode = params["mode"];
        this.formSearch.controls["mode"].patchValue(mode);
        setTimeout(() => {
          this.getListStartuper(true);
        }, 1000);
      });
      this.subscription.add(obs);
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách dự án của tôi thất bại!",
      });
    });

  }

  routeToHistorySearch(){
    this.router.navigate(['/startuper/history-search']);
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
    input.isStudent = this.formSearch.value.isStudent;
    input.university = this.formSearch.value.university;
    input.universitySpecialized = this.formSearch.value.universitySpecialized;
    input.studentId = this.formSearch.value.studentId;
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

  changeUniversity(e: any) {
    this.universitySpecializeds = FsiValues.universities.find(x => x.universityName == e.value)?.specializeds?.map(x => {
      return {
        value: x,
        name: x
      }
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
    this.formSearch.controls["availableTimes"].patchValue([]);
    this.formSearch.controls["skills"].patchValue([]);
    this.formSearch.controls["yearOfExps"].patchValue([]);
    this.formSearch.controls["mode"].patchValue(UuidStartuperModeNew);
    this.page = 1;
    this.pageSize = 10;
    this.getListStartuper(true);
  }

  acceptFriend(startuper: StartuperDto) {
    this.startuperService.acceptRequestFriendFromOrtherStartuper(startuper.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Chấp nhận yêu cầu kết nối thành công!",
      });
      this.getListStartuper();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Thất bại, vui lòng thử lại sau!",
      });
    });
  }

  requestFriend(startuper: StartuperDto) {
    this.startuperService.requestFriendToOrtherStartuper(startuper.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Yêu cầu kết nối thành công!",
      });
      this.getListStartuper();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Thất bại, vui lòng thử lại sau!",
      });
    });
  }

  requestFromProject(startuper: StartuperDto) {
    this.projectService.requestToUserFromProject(this.formSearch.value.mode, startuper.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Invite thành công!",
      });
      this.getListStartuper();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Invite thất bại!",
      });
    });
  }

  cancelRequestFriend(startuper: StartuperDto) {
    this.startuperService.cancelRequestToOrtherStartuper(startuper.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Hủy yêu cầu kết nối thành công!",
      });
      this.getListStartuper();
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
