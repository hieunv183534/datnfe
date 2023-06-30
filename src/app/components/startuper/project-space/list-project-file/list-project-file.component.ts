import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-project-file',
  templateUrl: './list-project-file.component.html',
  styleUrls: ['./list-project-file.component.css']
})
export class ListProjectFileComponent implements OnInit, OnChanges {

  @Input() projectId: string = "";

  files: any[] = [];

  isShowUpload: boolean = false;

  uploadFiles: any[] = [];
  title: string = "";
  note: string = "";
  visibleForInvestor: boolean = false;
  visibleForAll: boolean = false;

  @Input() isMyProject: boolean = false;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    @Inject(DOCUMENT) document: Document
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getListFile();
  }

  ngOnInit() {
  }

  clickVisibleForAll() {
    if (this.visibleForAll)
      this.visibleForInvestor = true;
  }

  getListFile() {
    this.projectService.getProjectFiles(this.projectId).then((res: any) => {
      this.files = res.data;
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
    this.projectService.getFileBlob(projectFile.id).then((res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", projectFile.file.url);
      document.body.appendChild(a);
      a.click();
      a.remove();
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy file thất bại!",
      });
    });
  }
}
