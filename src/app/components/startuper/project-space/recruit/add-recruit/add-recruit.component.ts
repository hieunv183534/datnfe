import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-add-recruit',
  templateUrl: './add-recruit.component.html',
  styleUrls: ['./add-recruit.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddRecruitComponent implements OnInit {

  skills: any = FsiValues.skills;
  workTypes: any = FsiValues.workTypes;
  personalities: any = FsiValues.personalities;
  availableTimes: any = FsiValues.availableTimes;
  yearOfExps: any = FsiValues.yearOfExps;
  areas: any = FsiValues.areas;
  genders: any = FsiValues.genders;
  
  constructor() { }

  ngOnInit() {
  }

}
