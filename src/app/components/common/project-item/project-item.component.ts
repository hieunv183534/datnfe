import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectStage, RelationWithProject } from 'src/app/model/enum';
import { FsiValues } from 'src/app/shared/util/util';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProjectItemComponent implements OnInit {
  @Input() project?: any;
  @Input() relationWithProject?: RelationWithProject;

  @Output() request: EventEmitter<any> = new EventEmitter();
  @Output() accept: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() adminAccept: EventEmitter<any> = new EventEmitter();
  @Output() adminDelete: EventEmitter<any> = new EventEmitter();
  @Output() adminViewDetail: EventEmitter<any> = new EventEmitter();

  isHovered: boolean = false;
  handleDetail: boolean = false;
  isNewProfile: boolean = false;
  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;

  projectStages: any[] = [
    { name: 'Xác lập', value: ProjectStage.XacLap },
    { name: 'Nghiên cứu', value: ProjectStage.NghienCuu },
    { name: 'MVP', value: ProjectStage.MVP },
    { name: 'Kiểm thử', value: ProjectStage.KiemThu },
    { name: 'Tăng trưởng 1', value: ProjectStage.TangTruong1 },
    { name: 'Tăng trưởng 2', value: ProjectStage.TangTruong2 },
    { name: 'Tăng trưởng 3', value: ProjectStage.TangTruong3 },
    { name: 'Tăng trưởng 4', value: ProjectStage.TangTruong4 },
  ];
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.isNewProfile = JSON.parse(localStorage.getItem("IS_NEW_PROFILE")??'false');
  }

  getArea(val: number) {
    return FsiValues.getName(val, FsiValues.areas);
  }

  getStage(val: ProjectStage) {
    return this.projectStages.find((x) => x.value == val).name;
  }

  getFields(val: number[]) {
    return FsiValues.getMultiName(val, FsiValues.fields).split(', ');
  }

  getSpecializes(val: number[]){
    return FsiValues.getMultiName(val, FsiValues.specializies).split(', ');
  }

  viewProject() {
    if (this.relationWithProject == 0) {
      this.showDetailProject();
    } else {
      this.handleDetail = true;
    }
  }

  showDetailProject() {
    if (this.relationWithProject == RelationWithProject.Admin) {
      this.adminViewDetail.emit(this.project.id);
    } else {
      this.router.navigate(['./startuper/project-space/' + this.project.id]);
    }
  }

  requestToProject() {
    this.request.emit(this.project.id);
  }

  acceptRequest() {
    this.accept.emit(this.project.id);
  }

  cancelRequest() {
    this.cancel.emit(this.project.id);
  }

  adminAccept1() {
    this.adminAccept.emit(this.project.id);
  }

  adminDelete1() {
    this.adminDelete.emit(this.project.id);
  }
  updateProfile() {
    let currentUserId = this.getDecodedAccessToken().nameid;
    this.router.navigate(['/profile/' + currentUserId]);
  }
  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }
}
