import { ProjectService } from 'src/app/services/project.service';
import { RecruitDto } from './../../../../../model/project.class';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-recruit',
  templateUrl: './view-recruit.component.html',
  styleUrls: ['./view-recruit.component.css']
})
export class ViewRecruitComponent implements OnInit {

  @Input() recruit!: RecruitDto
  constructor(
    private projectService: ProjectService
  ) {

  }

  ngOnInit() {
  }

}
