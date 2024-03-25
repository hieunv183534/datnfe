import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectStage } from 'src/app/model/enum';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() projectId: string = '';
  styleDialog: any = { width: '50vw' };
  // widthDialog: string = '800px';
  widthDialogJob: string = '35vw';
  widthBox1: string = '590px';
  widthBox2: string = '642px';
  innerWidth: any;
  project: any = { extraProperties: {} };
  @Output() close: EventEmitter<any> = new EventEmitter();
  showModal: boolean = true;
  showInfoJob: boolean = false;
  positionDialog: string = '';
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  projectStages: any[] = [
    { name: "Xác lập", value: ProjectStage.XacLap },
    { name: "Nghiên cứu", value: ProjectStage.NghienCuu },
    { name: "MVP", value: ProjectStage.MVP },
    { name: "Kiểm thử", value: ProjectStage.KiemThu },
    { name: "Tăng trưởng 1", value: ProjectStage.TangTruong1 },
    { name: "Tăng trưởng 2", value: ProjectStage.TangTruong2 },
    { name: "Tăng trưởng 3", value: ProjectStage.TangTruong3 },
    { name: "Tăng trưởng 4", value: ProjectStage.TangTruong4 }
  ];
  constructor(
    private projectService: ProjectService,
    private messageService: MessageService
  ) { }
  getArea(val: number) {
    return FsiValues.getName(val, FsiValues.areas);
  }

  getStage(val: ProjectStage) {
    return this.projectStages.find(x => x.value == val)?.name;
  }

  getFields(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.fields);
  }
  ngOnInit() {
    this.projectService.getProjectById(this.projectId).then((res: any) => {
      this.project = res.data;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy thông tin dự án thất bại!",
      });
    });
  }

  showDialogJob() {
    this.showModal = false
    this.showInfoJob = true
    this.positionDialog = 'left'
  }

  closeModalInfoJob() {
    this.showModal = true
    this.showInfoJob = false
    this.positionDialog = ''
  }
}
