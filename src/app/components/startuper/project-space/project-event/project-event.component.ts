import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectEventType } from 'src/app/model/enum';
import { GetProjectEventsDto, PostToProjectDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-event',
  templateUrl: './project-event.component.html',
  styleUrls: ['./project-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectEventComponent implements OnInit, OnChanges {

  @Input() project: any = {};
  isVisibleAddPost: boolean = false;

  filter?: string = "";
  type?: number = -1;


  eventTypes: any[] = [
    {
      name: "Tất cả",
      value: -1
    },
    {
      name: "Vòng đời dự án",
      value: 0
    },
    // {
    //   name: "Chuyển giai đoạn",
    //   value: 5
    // },
    {
      name: "Thay đổi thành viên",
      value: 1
    },
    {
      name: "Thay đổi nhà đầu tư",
      value: 3
    },
    {
      name: "Nhận tiền đầu tư",
      value: 6
    },
    {
      name: "Bài đăng",
      value: 7
    }
  ]

  listEvent: any[] = [];

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.getListEvent();
  }

  ngOnInit() {
  }

  getListEvent(reset: boolean = false) {
    if (reset) { this.page = 1; }
    let input = new GetProjectEventsDto();
    input.projectId = this.project.id;
    input.filter = this.filter;
    input.type = this.type;
    input.skipCount = (this.page - 1) * this.pageSize;
    input.maxResultCount = this.pageSize;
    this.projectService.getEventsOfProject(input).then((res: any) => {
      this.totalRecords = res.data.totalCount;
      this.listEvent = res.data.items;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách event thất bại, vui lòng thử lại!",
      });
    });
  }

  submitSearch() {
    this.getListEvent(true);
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
  }

}
