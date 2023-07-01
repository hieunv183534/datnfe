import { Component, Input, OnInit } from '@angular/core';
import { ProjectEventType } from 'src/app/model/enum';

@Component({
  selector: 'app-project-event',
  templateUrl: './project-event.component.html',
  styleUrls: ['./project-event.component.css']
})
export class ProjectEventComponent implements OnInit {

  @Input() projectId: string = "";
  isVisibleAddPost: boolean = false;


  eventTypes: any[] = [
    {
      name: "Tất cả",
      value: -1
    },
    {
      name: "Khởi tạo",
      value: ProjectEventType.Init
    },
    {
      name: "Thay đổi thành viên",
      value: ProjectEventType.NewMember
    },
    {
      name: "Thay đổi nhà đầu tư",
      value: ProjectEventType.NewInvestor
    },
    {
      name: "Nhận tiền đầu tư",
      value: ProjectEventType.GetInvesment
    },
    {
      name: "Chuyển giai đoạn",
      value: ProjectEventType.PhaseSwich
    },
    {
      name: "Bài đăng",
      value: ProjectEventType.PostNotification
    }
  ]

  listEvent: any[] = [];

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  constructor() { }

  ngOnInit() {
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
  }

}
