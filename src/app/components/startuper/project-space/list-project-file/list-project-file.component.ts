import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/services/event.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-project-file',
  templateUrl: './list-project-file.component.html',
  styleUrls: ['./list-project-file.component.css']
})
export class ListProjectFileComponent implements OnInit, OnChanges {

  @Input() projectId: string = "";
  @Input() isView: boolean = false;
  @Input() isMyProject: boolean = false;
  files: any[] = [];
  isShowUpload: boolean = false;
  uploadFiles: any[] = [];
  title: string = "";
  note: string = "";
  visibleForInvestor: boolean = false;
  visibleForAll: boolean = false;


  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private eventService: EventService,
    @Inject(DOCUMENT) document: Document
  ) { }

  iconContentType(type: string) {
    switch (type) {
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/rtf':
        return '../../../../../assets/icons/files/doc.svg'

      case 'application/pdf':
        return '../../../../../assets/icons/files/pdf.svg'

      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
      case 'text/csv':
        return '../../../../../assets/icons/files/xls.svg'
      case 'image/jpeg':
        return '../../../../../assets/icons/files/jpg.svg'
      case 'image/png':
        return '../../../../../assets/icons/files/png.svg'
      default:
        return '../../../../../assets/icons/files/file2.svg'
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getListFile();
  }

  ngOnInit() {
    this.eventService.currentReloadFiles.subscribe(reload => {
      if (reload != "FSI") {
        this.getListFile();
      }
    });
  }

  clickVisibleForAll() {
    if (this.visibleForAll)
      this.visibleForInvestor = true;
  }

  getListFile() {
    this.projectService.getProjectFiles(this.projectId).then((res: any) => {
      this.files = res.data;
      this.eventService.changeProjectFiles(res.data);
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách file thất bại!",
      });
    });
  }

  onFileChange(event: any) {
    this.uploadFiles = event.target.files;
  }

  upload() {
    if (!this.title || this.uploadFiles.length == 0) {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Chưa đầy đủ dữ liểu để upload!",
      });
    } else {
      this.projectService.uploadFile(this.uploadFiles[0], this.projectId, this.title, this.note, this.visibleForInvestor, this.visibleForAll).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Upload thành công!",
        });
        this.isShowUpload = false;
        this.uploadFiles = [];
        this.title = "";
        this.note = "";
        this.getListFile();
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Upload thất bại!",
        });
      });
    }
  }

  downloadFile(projectFile: any) {
    console.log();
    const a = document.createElement("a");
    a.href = projectFile.file.extraProperties.LinkDownLoad;
    a.setAttribute("download", projectFile.file.url);
    document.body.appendChild(a);
    a.click();
    a.remove();
    // this.projectService.getFileBlob(projectFile.id).then((res: any) => {
    // const url = window.URL.createObjectURL(new Blob([projectFile.data.extraProperties.LinkDownLoad]));
    // const a = document.createElement("a");
    // a.href = url;
    // a.setAttribute("download", projectFile.file.url);
    // document.body.appendChild(a);
    // a.click();
    // a.remove();
    // }).catch((err: any) => {
    //   this.messageService.add({
    //     key: "toast",
    //     severity: "error",
    //     summary: "Lỗi",
    //     detail: "Lấy file thất bại!",
    //   });
    // });
  }
}
