import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PostToProjectDto } from 'src/app/model/project.class';
import { EventService } from 'src/app/services/event.service';
import { ProjectService } from 'src/app/services/project.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPostComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() projectId: string = "";
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() addSuccess: EventEmitter<any> = new EventEmitter();

  images: any[] = [];

  files: any[] = [];

  isShowGalleria: boolean = true;


  isShowUpload: boolean = false;

  uploadFiles: any[] = [];
  title: string = "";
  note: string = "";
  visibleForInvestor: boolean = false;
  visibleForAll: boolean = false;

  documents: any[] = [];
  projectFileIds: string[] = [];


  links: string[] = [];

  location: string = "";
  content: string = "";
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  clickVisibleForAll() {
    if (this.visibleForAll)
      this.visibleForInvestor = true;
  }

  onFileChange(e: any) {
    Array.from(e.target.files).forEach((file: any) => {
      var reader = new FileReader();
      var seft = this;
      let id = uuidv4();
      this.files.push({
        id: id,
        file: file
      });
      reader.onload = function (event) {
        seft.images = [...seft.images, {
          previewImageSrc: event?.target?.result,
          thumbnailImageSrc: event?.target?.result,
          id: id
        }]
      };
      reader.readAsDataURL(file);
    });

    e.target.value = null;
  }

  deleteImage(id: string) {
    this.images = [...this.images.filter(x => x.id != id)];
    this.files = this.files.filter(x => x.id != id);

    this.isShowGalleria = false;
    setTimeout(() => {
      this.isShowGalleria = true;
    }, 100)
  }

  addPostOnClick() {
    if (this.content) {
      let input = new PostToProjectDto();
      input.content = this.content;
      input.location = this.location;
      input.links = this.links;
      input.fileIds = this.projectFileIds;
      input.projectId = this.projectId;
      var medias = this.files.map(x => x.file);
      this.projectService.postToProject(input, medias).then((res: any) => {
        this.addSuccess.emit();
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Đăng bài viết mới thành công!",
        });
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Upload thất bại!",
        });
      });
    } else {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Nội dung không được để trống!",
      });
    }
  }

  onFileChange1(event: any) {
    this.uploadFiles = event.target.files;
  }

  deleteDocument(id: string) {
    this.documents = this.documents.filter(x => x.id != id);
    this.projectFileIds = this.projectFileIds.filter(x => x != id);
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

        this.eventService.reloadFiles("")
        this.documents = [...this.documents, {
          title: this.title,
          name: this.uploadFiles[0].name,
          id: res.data
        }]

        this.projectFileIds.push(res.data);
        this.isShowUpload = false;
        this.uploadFiles = [];
        this.title = "";
        this.note = "";
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
}
