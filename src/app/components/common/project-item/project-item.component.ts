import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectStage } from 'src/app/model/enum';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input()project?: any;
  isHovered: boolean = false;

  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getArea(val: number) {
    return FsiValues.getName(val, FsiValues.areas);
  }

  getStage(val: ProjectStage) {
    return this.projectStages.find(x => x.value == val).name;
  }

  getFields(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.fields);
  }

  showDetailProject(){
    this.router.navigate(['./startuper/project-space/' + this.project.id]);
  }

}
