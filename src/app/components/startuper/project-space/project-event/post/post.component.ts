import { Component, Input, OnInit } from '@angular/core';
import { ProjectEventType, ProjectStage } from 'src/app/model/enum';
import { Util } from 'src/app/shared/util/util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() project: any = {};
  @Input() event: any = {};

  ProjectEventType = ProjectEventType;

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

  medias: any[] = [];

  constructor() { }

  ngOnInit() {
    if(this.event.images){
      this.medias = this.event.images.map((url: string)=>{
        return {
          previewImageSrc: url,
          thumbnailImageSrc: url,
        }
      })
    }
  }

  getDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }

  getStage(val: ProjectStage) {
    return this.projectStages.find(x => x.value == val)?.name;
  }

}
