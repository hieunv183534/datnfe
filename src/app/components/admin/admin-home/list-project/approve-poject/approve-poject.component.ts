import { Component, Input, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/enum';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-approve-poject',
  templateUrl: './approve-poject.component.html',
  styleUrls: ['./approve-poject.component.css']
})
export class ApprovePojectComponent implements OnInit {
  @Input() project?: any;

  constructor() { }

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
  }

}
