import { RecruitDto } from './../../../../model/project.class';
import { ProjectService } from 'src/app/services/project.service';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FsiValues } from 'src/app/shared/util/util';
import { AddRecruitComponent } from './add-recruit/add-recruit.component';
import { UpdateRecruitComponent } from './update-recruit/update-recruit.component';

@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class RecruitComponent implements OnInit {
  listJobs: RecruitDto[] = [];
  isShowAddRecruit: boolean = false;
  isShowUpdateRecruit: boolean = false;
  isShowViewRecruit: boolean = false;
  recruit: RecruitDto = new RecruitDto();
  @Input() projectId: string = '';
  @ViewChild("addRecruit") addRecruit?: AddRecruitComponent;
  @ViewChild("updateRecruit") updateRecruit?: UpdateRecruitComponent;
  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  handleAddRecruit() {
    this.addRecruit?.submit();
  }
  handleEditRecruit() {
    this.updateRecruit?.submit();
  }
  ngOnInit() {
    this.getListRecruit();
  }
  getAreaName(value?: number) {
    if (value)
      return FsiValues.getName(value, FsiValues.areas)
    else
      return ''
  }

  async getListRecruit() {
    let res = await this.projectService.getRecruitsByProjectId(this.projectId)
    this.listJobs = res.data
  }
  async getRecruitById(recruitId?: string, type?: string) {
    if (recruitId)
      await this.projectService.getRecruitById(this.projectId, recruitId).then((res: any) => {
        this.recruit = res.data;
      })
    if (type === "view")
      this.isShowViewRecruit = true;
    else
      this.isShowUpdateRecruit = true;
  }
  getIncome(value?: number, recruit?: RecruitDto) {
    if (value === 1)
      return "Thỏa thuận";
    else if (value === 2)
      return "Từ " + recruit?.incomeFrom + " triệu"
    else if (value === 3)
      return 'Lên đến ' + recruit?.incomeTo + " triệu"
    else if (value === 4)
      return recruit?.incomeFrom + ' - ' + recruit?.incomeTo + " triệu"
    else (value === 5)
    return FsiValues.getName(5, FsiValues.incomeRanges)
  }
  deleteRecruit(event: any, id?: string, title?: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Bạn có muốn xóa ${title} không?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (id)
          this.projectService.deleteRecruit(this.projectId, id).then((res: any) => {
            this.messageService.add({
              key: "toast",
              severity: "success",
              summary: "Thành công",
              detail: "Xóa bài đăng thành công!",
            });
            this.getListRecruit();
          }).catch((err: any) => {
            this.messageService.add({
              key: "toast",
              severity: "error",
              summary: "Lỗi",
              detail: "Xóa bài đăng thất bại!",
            });
          })
      },
      reject: () => {
      }
    });
  }
}
