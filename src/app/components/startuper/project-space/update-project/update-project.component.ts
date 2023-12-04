import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MenuItem, MessageService } from 'primeng/api';
import { ProjectStage, ProjectEventType } from 'src/app/model/enum';
import { ProjectService } from 'src/app/services/project.service';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() project: any = {};
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() changeProjectInfo: EventEmitter<any> = new EventEmitter();

  steps: MenuItem[] = [];
  formProject: FormGroup = this.fb.group({});
  activeIndex: number = 0;

  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;
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
    private messageService: MessageService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.croppedImage = this.project.avatarUrl;

    this.steps = [
      { label: 'Avatar' },
      { label: 'Thông tin' }
    ];

    this.formProject = this.fb.group({
      projectName: [this.project.projectName, []],
      description: [this.project.description, []],
      fields: [this.project.fields, []],
      stage: [this.project.stage, []],
      foundedTime: [new Date(this.project.foundedTime), []],
      area: [this.project.area, []],
      website: [this.project.website, []],
      fb: [this.project.fb, []]
    });
  }

  save() {
    if (this.activeIndex == 0) {
      if (this.blob) {
        this.uploadImage();
      }
    } else if (this.activeIndex == 1) {
      let newProjectInfo = { ...this.project, ...this.formProject.value };
      this.projectService.updateProjectAsync(newProjectInfo).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật thông tin dự án thành công!"
        });
        this.changeProjectInfo.emit(newProjectInfo);
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Cập nhật thông tin dự án thất bại!"
        });
      });
    } else {

    }
  }


  @ViewChild(ImageCropperComponent) imageCropper?: ImageCropperComponent;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  blob: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.blob = event.blob;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl ?? "");
  }

  imageLoaded(image: LoadedImage) {
    console.log("imageLoaded");
  }
  cropperReady() {
    console.log("cropperReady");
  }
  loadImageFailed() {
    console.log("loadImageFailed");
  }

  uploadImage() {
    let file = new File([this.blob], '1.png');
    this.projectService.uploadAvatar(file, this.project.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Tải lên ảnh đại diện dự án thành công!",
      });
      this.changeProjectInfo.emit({ ...this.project, avatarUrl: res.data });
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Tải lên ảnh đại diện dự án thất bại!",
      });
    });
  }

}
