import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/services/event.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css']
})
export class FileItemComponent implements OnInit {

  @Input() projectFileId: string = "";

  file: any = {};

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private eventService: EventService,
    @Inject(DOCUMENT) document: Document
  ) { }

  ngOnInit() {
    this.eventService.currentProjectFiles.subscribe(files=>{
      if(files){
        this.file = files.find(x=> x.id == this.projectFileId);
      }
    });
  }


  downloadFile(){
    this.projectService.getFileBlob(this.projectFileId).then((res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", this.file.file.url);
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
