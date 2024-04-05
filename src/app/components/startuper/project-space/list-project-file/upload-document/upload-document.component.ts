import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],

})
export class UploadDocumentComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() projectId: string = '';
  @Output() fetchData = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  files: any[] = [];
  uploadFiles: any[] = [];
  title: string = "";
  note: string = "";
  visibleForInvestor: boolean = false;
  visibleForAll: boolean = false;
  isLoading: boolean = false;
  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }
  onFileChange(event: any) {
    this.uploadFiles = event.target.files;
  }
  clickVisibleForAll() {
    if (this.visibleForAll)
      this.visibleForInvestor = true;
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
      this.isLoading = true;
      this.projectService.uploadFile(this.uploadFiles[0], this.projectId, this.title, this.note, this.visibleForInvestor, this.visibleForAll).then((res: any) => {
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Upload thành công!",
        });
        this.display = false;
        this.uploadFiles = [];
        this.title = "";
        this.note = "";
        this.fetchData.emit();
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Upload thất bại!",
        });
      }).finally(() => this.isLoading = false);
    }
  }

}
