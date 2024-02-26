import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-pitch-deck',
  templateUrl: './pitch-deck.component.html',
  styleUrls: ['./pitch-deck.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PitchDeckComponent implements OnInit {

  @Input() projectId: string = '';

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.getPickDeck();
  }
  async getPickDeck() {
     await this.projectService.getPitchDeck(this.projectId).then((res:any)=>{
      console.log(res);
      
     }).catch(()=>{
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Lỗi",
        detail: "Lấy danh sách Pitch deck thất bại!",
      });
     })

  }

  myUploader(e: any) {
    this.projectService.addPitchDeck(e.files, this.projectId);
    
  }
}
