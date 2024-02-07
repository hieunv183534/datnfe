import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectStage, RelationWithProject } from 'src/app/model/enum';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() display: boolean = false;
  styleDialog: any = { width: '50vw' };
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }

}
