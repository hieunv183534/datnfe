import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { ProjectEventType, ProjectStage } from 'src/app/model/enum';
import { CreateUpdateProjectDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';
import { StartuperService } from 'src/app/services/startuper.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  activeIndex: number = 0;
  formProject: FormGroup = this.fb.group({});
  formEvent: FormGroup = this.fb.group({});
  project: any = "";
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


  displayAddEvent: boolean = false;

  keySearchUser: string = "";

  inviteUsers: any[] = []

  constructor(
    private projectService: ProjectService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  getStage(stage: any) {
    return this.projectStages.find((x: any) => {
      return x.value == stage;
    }).name;
  }


  ngOnInit() {
    this.formProject = this.fb.group({
      projectName: [null, []],
      description: [null, []],
      fields: [null, []],
      stage: [null, []],
      foundedTime: [null, []],
      area: [null, []],
      website: [null, []],
      fb: [null, []]
    });

    this.formEvent = this.fb.group({
      stage: [null, []],
      type: [null, []],
      eventTime: [null, []],
      detail: [null, []]
    });
  }

  next() {
    if (this.activeIndex == 0) {
      if (this.formProject.valid) {
        let input = new CreateUpdateProjectDto();
        input.area = this.formProject.value.area;
        input.description = this.formProject.value.description;
        input.fb = this.formProject.value.fb;
        input.fields = this.formProject.value.fields;
        input.foundedTime = this.formProject.value.foundedTime;
        input.projectName = this.formProject.value.projectName;
        input.stage = this.formProject.value.stage;
        input.website = this.formProject.value.website;
        this.projectService.insertProjectAsync(input).then((res: any) => {
          this.project = res.data;
          this.messageService.add({
            key: "toast",
            severity: "success",
            summary: "Thành công",
            detail: "Thêm thông tin thành công!",
          });
          this.activeIndex++;
        }).catch((err: any) => {
          this.messageService.add({
            key: "toast",
            severity: "error",
            summary: "Lỗi",
            detail: "Thêm thông tin thất bại!",
          });
        });
      } else {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Cảnh báo",
          detail: "Vui lòng hoàn thành form trước khi qua bước tiếp theo!",
        });
      }
    } else if (this.activeIndex == 1) {
      if (this.blob) {
        this.uploadImage();
      } else {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Cảnh báo",
          detail: "Bạn chưa hoàn thành cập nhật ảnh đại diện dự án!",
        });
      }
    }else if(this.activeIndex == 2){
      this.close.emit();
    }
  }

  back() {
    this.activeIndex--;
  }

  hide() {
    this.close.emit();
  }


  submitSearchUser() {
    this.projectService.getUserByUserNameForInviteToProject(this.keySearchUser, this.project.id).then((res: any) => {
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Tìm thấy user, hãy gửi yêu cầu đến họ nào!",
      });
      this.inviteUsers.unshift(res.data);
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "User không tồn tại hoặc đã có sẵn trong dự án!",
      });
    });
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
      this.activeIndex++;
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
