import { Component, OnInit } from '@angular/core';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-project-space',
  templateUrl: './project-space.component.html',
  styleUrls: ['./project-space.component.css']
})
export class ProjectSpaceComponent implements OnInit {
  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;

  isShowAddMember: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
