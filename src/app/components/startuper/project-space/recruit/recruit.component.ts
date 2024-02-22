import { RecruitDto } from './../../../../model/project.class';
import { ProjectService } from 'src/app/services/project.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.css']
})
export class RecruitComponent implements OnInit {
  listJobs: RecruitDto[] = [];
  isShowAddRecruit: boolean = false;
  isShowViewRecruit: boolean = false;
  recruit: RecruitDto = new RecruitDto();
  @Input() projectId: string = '';

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getListRecruit();
    // this.listJobs = [
    //   {
    //     title: "Lập trình viện fullstack",
    //     salary: "thương lượng",
    //     dueTo: "17/1/2034",
    //     area: "Tp.Hồ chí minh",
    //     view: '999 lượt xem',
    //     updateDate: "17/1/2034"
    //   },
    //   {
    //     title: "Lập trình viện fullstack",
    //     salary: "thương lượng",
    //     dueTo: "17/1/2034",
    //     area: "Tp.Hồ chí minh",
    //     view: '999 lượt xem',
    //     updateDate: "17/1/2034"
    //   },
    //   {
    //     title: "Lập trình viện fullstack",
    //     salary: "thương lượng",
    //     dueTo: "17/1/2034",
    //     area: "Tp.Hồ chí minh",
    //     view: '999 lượt xem',
    //     updateDate: "17/1/2034"
    //   },
    //   {
    //     title: "Lập trình viện fullstack",
    //     salary: "thương lượng",
    //     dueTo: "17/1/2034",
    //     area: "Tp.Hồ chí minh",
    //     view: '999 lượt xem',
    //     updateDate: "17/1/2034"
    //   },
    //   {
    //     title: "Lập trình viện fullstack",
    //     salary: "thương lượng",
    //     dueTo: "17/1/2034",
    //     area: "Tp.Hồ chí minh",
    //     view: '999 lượt xem',
    //     updateDate: "17/1/2034"
    //   },
    // ]
  }
  async getListRecruit() {
    let res = await this.projectService.getRecruitsByProjectId(this.projectId)
    this.listJobs = res.data
  }
  async getRecruitById(recruitId?: string) {
    if (recruitId)
      await this.projectService.getRecruitById(this.projectId, recruitId).then((res: any) => {
        this.recruit = res.data;
      })
      this.isShowViewRecruit = true;
  }
}
