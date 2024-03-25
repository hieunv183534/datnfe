import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-pitch-deck',
  templateUrl: './pitch-deck.component.html',
  styleUrls: ['./pitch-deck.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PitchDeckComponent implements OnInit {
  listPitchDeck: any[] = [];
  myFiles: any[] = [];
  @Input() projectId: string = '';
  @Input() isView: boolean = false;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.getPickDeck();
  }
  async getPickDeck() {
    await this.projectService.getPitchDeck(this.projectId).then((res: any) => {
      this.listPitchDeck = res.data;

    }).catch(() => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách Pitch deck thất bại!",
      });
    })
  }

  myUploader(e: any) {
    this.projectService.addPitchDeck(e.files, this.projectId).then(() => {
      this.getPickDeck();
      this.myFiles = [];
    }).catch(() => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Upload Pitch deck thất bại!",
      });
    });
  }
  onReorder() {
    this.projectService.sortPitchDeck(this.projectId, this.listPitchDeck).then(() => {
      this.getPickDeck();
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Thay đổi vị trí thành công!",
      });
    }).catch(() => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Thay đổi vị trí thất bại!",
      });
    })
  }
  deletePitchDeck(event: any, pitchDeck: any) {

    this.projectService.deletePitchDeck(this.projectId, pitchDeck.id).then((res: any) => {
      this.getPickDeck();
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Xóa Pitch deck thành công!",
      });
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Xóa Pitch deck thất bại!",
      });
    })

  }

}
