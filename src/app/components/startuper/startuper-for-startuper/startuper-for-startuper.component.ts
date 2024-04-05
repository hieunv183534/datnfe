import { EventService } from 'src/app/services/event.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  UuidStartuperModeFromMe,
  UuidStartuperModeNew,
  UuidStartuperModeOFMe,
  UuidStartuperModeToMe,
} from 'src/app/model/enum';
import {
  GetListStartuperForProjectDto,
  StartuperDto,
} from 'src/app/model/startuper.class';
import { UserDto } from 'src/app/model/user.class';
import { ProjectService } from 'src/app/services/project.service';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-startuper-for-startuper',
  templateUrl: './startuper-for-startuper.component.html',
  styleUrls: ['./startuper-for-startuper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StartuperForStartuperComponent implements OnInit, OnDestroy {
  specializies: any = FsiValues.specializies;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;
  personalities: any = FsiValues.personalities;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;
  purposes: any = FsiValues.purposes;

  disabledSearch: boolean = false;
  checkStudent: boolean = false;

  listSort: any = [
    { name: 'suitable', label: 'Phù hợp nhất' },
    { name: 'availableTime', label: 'Thời gian khả dụng tăng ⇧' },
    { name: 'availableTimeDESC', label: 'Thời gian khả dụng giảm ⇩' },
    { name: 'yearOfExp', label: 'Năm kinh nghiệm tăng ⇧' },
    { name: 'yearOfExpDESC', label: 'Năm kinh nghiệm giảm ⇩' },
  ];

  universities: any[] = FsiValues.universities.map((x) => {
    return {
      value: x.universityName,
      name: x.universityName,
    };
  });

  universitySpecializeds?: any[] = FsiValues.universities[0].specializeds?.map(
    (x) => {
      return {
        value: x,
        name: x,
      };
    }
  );

  listStartuper: StartuperDto[] = [];

  formSearch: FormGroup = this.fb.group({});
  mode: string = UuidStartuperModeNew;
  filter: string = "";

  page: number = 1;
  pageSize: number = 12;
  pageSizeOptions: any[] = [12, 24, 36, 48, 72];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  sorting: string = '';
  styleBtnSuitable: any = {};
  styleBtnAvailableTime: any = 'p-button-secondary';
  styleBtnYearOfExp: any = 'p-button-secondary';

  mySelects: any[] = [];
  userSelect: UserDto = {};
  userInfo: any = {};

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

  get f() {
    return this.formSearch.controls;
  }

  ngOnInit() {
    // this.eventService.currentReloadStartuper.subscribe((reload) => {
    //   if (reload != 'FSI') {
    //     this.getListStartuper();
    //   }
    // });
    this.userInfo = this.getDecodedAccessToken();

    console.log('user info', this.userInfo);

    this.formSearch = this.fb.group({
      specializies: [[], []],
      areas: [[], []],
      availableTimes: [[], []],
      skills: [null, []],
      purposes: [null, []],
      personalities: [[], []],
      yearOfExps: [[], []],
      isStudent: [false, []],
      university: [null, []],
      universitySpecialized: [null, []],
      studentId: [null, []],
    });

    this.mySelects = [
      {
        name: 'Dành cho bản thân',
        code: 1,
        selects: [
          {
            cname: 'Nhà khởi nghiệp mới cho tôi',
            code: UuidStartuperModeNew,
          },
          {
            cname: 'Nhà khởi nghiệp đã kết nối',
            code: UuidStartuperModeOFMe,
          },
          {
            cname: 'Nhà khởi nghiệp đã gửi yêu cầu kết nối',
            code: UuidStartuperModeFromMe,
          },
          {
            cname: 'Nhà khởi nghiệp gửi yêu cầu kết nối tới bạn',
            code: UuidStartuperModeToMe,
          },
        ],
      },
      {
        name: 'Nhà khởi nghiệp dành cho dự án',
        code: 2,
        selects: [],
      },
    ];

    this.startuperService
      .getMyProjects()
      .then((res: any) => {
        this.mySelects[1].selects = res.data.map((x: any) => {
          return {
            code: x.project.id,
            cname: 'Dành cho dự án ' + x.project.projectName,
          };
        });
        var obs = this.route.params.subscribe((params) => {
          this.mode = params['mode'];
          this.getListStartuper(true);
        });
        this.subscription.add(obs);
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Lấy danh sách dự án của tôi thất bại!',
        });
      });
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem('TOKEN') ?? '');
    } catch (Error) {
      return null;
    }
  }

  routeToHistorySearch() {
    this.router.navigate(['/startuper/history-search']);
  }

  sortingSearch(value: string) {
    this.sorting = value;
    if (value == 'suitable') {
      this.styleBtnSuitable = '';
      this.styleBtnAvailableTime = 'p-button-secondary';
      this.styleBtnYearOfExp = 'p-button-secondary';
    } else if (value == 'availableTime') {
      this.styleBtnSuitable = 'p-button-secondary';
      this.styleBtnAvailableTime = '';
      this.styleBtnYearOfExp = 'p-button-secondary';
    } else if (value == 'yearOfExp') {
      this.styleBtnSuitable = 'p-button-secondary';
      this.styleBtnAvailableTime = 'p-button-secondary';
      this.styleBtnYearOfExp = '';
    }
    console.log(this.styleBtnAvailableTime);
    this.getListStartuper(true);
  }

  chooseStudent() {
    this.checkStudent = !this.checkStudent
  }

  getListStartuper(reset: boolean = false) {
    if (reset) {
      this.page = 1;
    }
    let input = new GetListStartuperForProjectDto();
    input.areas = this.formSearch.value.areas ?? [];
    input.specializies = this.formSearch.value.specializies ?? [];
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
    input.sorting = this.sorting;
    input.purposes = this.formSearch.value.purposes ?? [];
    this.startuperService
      .getListStartuper({ ...input, mode: this.mode, filter: this.filter })
      .then((res: any) => {
        this.totalRecords = res.data.totalCount;
        this.listStartuper = res.data.items;
        this.disabledSearch = false;
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Lấy danh sách Nhà khởi nghiệp thất bại, vui lòng thử lại!',
        });
      });
  }

  changeSort(e: any) {
    this.sorting = e.value
    this.getListStartuper(true);
  }

  changeUniversity(e: any) {
    this.universitySpecializeds = FsiValues.universities
      .find((x) => x.universityName == e.value)
      ?.specializeds?.map((x) => {
        return {
          value: x,
          name: x,
        };
      });
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
    this.getListStartuper(false);
  }

  submitSearch() {
    this.disabledSearch = true;
    this.getListStartuper(true);
  }

  clearSearch() {
    this.formSearch.controls['filter'].patchValue(null);
    this.formSearch.controls['specializies'].patchValue([]);
    this.formSearch.controls['areas'].patchValue([]);
    this.formSearch.controls['availableTimes'].patchValue([]);
    this.formSearch.controls['skills'].patchValue([]);
    this.formSearch.controls['yearOfExps'].patchValue([]);
    this.formSearch.controls['mode'].patchValue(UuidStartuperModeNew);
    this.formSearch.controls['university'].patchValue(null);
    this.formSearch.controls['universitySpecialized'].patchValue(null);
    this.page = 1;
    this.pageSize = 10;
    this.getListStartuper(true);
  }

  acceptFriend(startuper: StartuperDto) {
    this.startuperService
      .acceptRequestFriendFromOrtherStartuper(startuper.id)
      .then((res: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Thành công',
          detail: 'Chấp nhận yêu cầu kết nối thành công!',
        });
        this.getListStartuper();
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Thất bại, vui lòng thử lại sau!',
        });
      });
  }

  requestFriend(startuper: StartuperDto) {
    this.startuperService
      .requestFriendToOrtherStartuper(startuper.id)
      .then((res: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Thành công',
          detail: 'Yêu cầu kết nối thành công!',
        });
        this.getListStartuper();
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Thất bại, vui lòng thử lại sau!',
        });
      });
  }

  requestFromProject(startuper: StartuperDto) {
    this.projectService
      .requestToUserFromProject(this.formSearch.value.mode, startuper.id)
      .then((res: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Thành công',
          detail: 'Invite thành công!',
        });
        this.getListStartuper();
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Invite thất bại!',
        });
      });
  }

  cancelRequestFriend(startuper: StartuperDto) {
    this.startuperService
      .cancelRequestToOrtherStartuper(startuper.id)
      .then((res: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Thành công',
          detail: 'Hủy yêu cầu kết nối thành công!',
        });
        this.getListStartuper();
      })
      .catch((err: any) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Thất bại, vui lòng thử lại sau!',
        });
      });
  }
}
