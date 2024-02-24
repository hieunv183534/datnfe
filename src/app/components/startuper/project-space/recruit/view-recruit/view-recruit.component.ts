import { ProjectService } from 'src/app/services/project.service';
import { RecruitDto } from './../../../../../model/project.class';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataPointDto, FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-view-recruit',
  templateUrl: './view-recruit.component.html',
  styleUrls: ['./view-recruit.component.css']
})
export class ViewRecruitComponent implements OnInit {
  skills: any = FsiValues.skills;
  workTypes: any = FsiValues.workTypes;
  personalities: any = FsiValues.personalities;
  availableTimes: any = FsiValues.availableTimes;
  yearOfExps: any = FsiValues.yearOfExps;
  areas: any = FsiValues.areas;
  degrees: any = FsiValues.degrees;
  specializes: any = FsiValues.specializies;
  @Input() recruit!: RecruitDto
  constructor(
    private projectService: ProjectService
  ) {

  }
  getIncome() {
    if (this.recruit.incomeMode === 1)
      return "Thỏa thuận";
    else if (this.recruit.incomeMode === 2)
      return "Từ " + this.recruit?.incomeFrom + " triệu"
    else if (this.recruit.incomeMode === 3)
      return 'Lên đến ' + this.recruit?.incomeTo + " triệu"
    else if (this.recruit.incomeMode === 4)
      return this.recruit?.incomeFrom + ' - ' + this.recruit?.incomeTo + " triệu"
    else (this.recruit.incomeMode === 5)
    return FsiValues.getName(5, FsiValues.incomeRanges)
  }
  getName(value: number, arr: DataPointDto[]) {
    return arr.find(x => x?.value == value)?.name;
  }
  getMultiName(values: number[], arr: DataPointDto[]) {
    return arr.filter(x => values?.includes(x.value ?? 0)).map(x => x.name).join(', ');
  }
  ngOnInit() {
  }

}
