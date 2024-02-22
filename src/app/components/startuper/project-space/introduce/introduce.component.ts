import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
  isFirstItem: boolean = false
  isLastItem: boolean = false
  indexItemEdit?: number = undefined
  itemIndex?: number = undefined
  modelIndex?: number = undefined
  isNewContent?: number = undefined
  projectId: string = '';
  value: string = '';

  businessModel: {
    title: string;
    content: { value: string, index: number }[];
    bg: string
  }[] = [{
    title: "Problem",
    content: [],
    bg: "#FEC56F"
  },
  {
    title: "Solution",
    content: [],
    bg: "#FEEE6F"
  },
  {
    title: "Unique Value Proposition",
    content: [],
    bg: "#C8FE6F"
  },
  {
    title: "Unfair Advantage",
    content: [],
    bg: "#6FFEA8"
  },
  {
    title: "Customer Segments",
    content: [],
    bg: "#6FF5FE"
  },
  {
    title: "Exiting Alternatives",
    content: [],
    bg: "#6FF5FE"
  },
  {
    title: "Key Metrics",
    content: [],
    bg: "#6FFEA8"
  },
  {
    title: "High-Level Concept",
    content: [],
    bg: "#C8FE6F"
  },
  {
    title: "Channels",
    content: [],
    bg: "#FEEE6F"
  },
  {
    title: "Early Adopter",
    content: [],
    bg: "#FEC56F"
  },
  {
    title: "Cost Structure",
    content: [],
    bg: "#FEC56F"
  },
  {
    title: "Revenue Streams",
    content: [],
    bg: "#6FF5FE"
  },
    ];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,

  ) { }
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.projectId = params["projectId"];
    });
    this.getCanvasBusinessModel()
  }
  getCanvasBusinessModel() {
    this.projectService.getProjectBusinessModel(this.projectId).then((res: any) => {
      if (res.data) {
        this.businessModel = res.data
      }
      else
        return;
    }).catch((err: any) => {

    });
  }
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleUpdate();
    }
    else
      return;
  }

  handleUpdate() {
    if (this.isNewContent !== undefined && this.value !== '') {
      this.businessModel[this.isNewContent].content.push({ value: this.value, index: this.businessModel[this.isNewContent].content.length })
      let businessModelStr = JSON.stringify(this.businessModel);
      this.projectService.updateProjectBusinessModel(this.projectId, businessModelStr).then((res: any) => {

      }).catch((err: any) => {
        debugger
      });
      this.value = '';
      this.isNewContent = undefined
    }
    else {
      {
        this.isNewContent = undefined
      }
    }
  }
  handleEdit() {
    if (this.modelIndex !== undefined && this.indexItemEdit != undefined) {
      this.businessModel[this.modelIndex].content[this.indexItemEdit].value = this.value
      debugger
      let businessModelStr = JSON.stringify(this.businessModel);
      // this.projectService.updateProjectBusinessModel(this.projectId, businessModelStr).then((res: any) => {
      // }).catch((err: any) => {
      // });
    }
  }
  handleDelete() {
    if (this.itemIndex !== undefined && this.modelIndex !== undefined) {
      const model = this.businessModel[this.modelIndex];
      if (model.content.length > this.itemIndex) {
        model.content.splice(this.itemIndex, 1);
      }
      let businessModelStr = JSON.stringify(this.businessModel);
      this.projectService.updateProjectBusinessModel(this.projectId, businessModelStr).then((res: any) => {

      }).catch((err: any) => {
      });
    }
  }
  moveUp() {
    if (this.itemIndex !== undefined && this.modelIndex !== undefined && this.itemIndex > 0) {
      const temp = this.businessModel[this.modelIndex].content[this.itemIndex];
      this.businessModel[this.modelIndex].content[this.itemIndex] = this.businessModel[this.modelIndex].content[this.itemIndex - 1];
      this.businessModel[this.modelIndex].content[this.itemIndex - 1] = temp;
      let businessModelStr = JSON.stringify(this.businessModel);
      this.projectService.updateProjectBusinessModel(this.projectId, businessModelStr).then((res: any) => {

      }).catch((err: any) => {
      });
    }
  }
  moveDown() {
    if (this.itemIndex !== undefined && this.modelIndex !== undefined && this.itemIndex < (this.businessModel[this.modelIndex].content.length - 1)) {
      const temp = this.businessModel[this.modelIndex].content[this.itemIndex];
      this.businessModel[this.modelIndex].content[this.itemIndex] = this.businessModel[this.modelIndex].content[this.itemIndex + 1];
      this.businessModel[this.modelIndex].content[this.itemIndex + 1] = temp;
      let businessModelStr = JSON.stringify(this.businessModel);
      this.projectService.updateProjectBusinessModel(this.projectId, businessModelStr).then((res: any) => {

      }).catch((err: any) => {
        debugger
      });
    }
  }
}
