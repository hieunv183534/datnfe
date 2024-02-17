import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.css']
})
export class RecruitComponent implements OnInit {
  listJobs: any[] = [];
  constructor() { }

  ngOnInit() {
    this.listJobs = [
      {
        title: "Lập trình viện fullstack",
        salary: "thương lượng",
        dueTo: "17/1/2034",
        area: "Tp.Hồ chí minh",
        view: '999 lượt xem',
        updateDate: "17/1/2034"
      },
      {
        title: "Lập trình viện fullstack",
        salary: "thương lượng",
        dueTo: "17/1/2034",
        area: "Tp.Hồ chí minh",
        view: '999 lượt xem',
        updateDate: "17/1/2034"
      },
      {
        title: "Lập trình viện fullstack",
        salary: "thương lượng",
        dueTo: "17/1/2034",
        area: "Tp.Hồ chí minh",
        view: '999 lượt xem',
        updateDate: "17/1/2034"
      },
      {
        title: "Lập trình viện fullstack",
        salary: "thương lượng",
        dueTo: "17/1/2034",
        area: "Tp.Hồ chí minh",
        view: '999 lượt xem',
        updateDate: "17/1/2034"
      },
      {
        title: "Lập trình viện fullstack",
        salary: "thương lượng",
        dueTo: "17/1/2034",
        area: "Tp.Hồ chí minh",
        view: '999 lượt xem',
        updateDate: "17/1/2034"
      },
    ]
  }

}
