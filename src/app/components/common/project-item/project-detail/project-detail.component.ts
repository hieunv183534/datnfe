import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectStage, RelationWithProject } from 'src/app/model/enum';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  @Input() display: boolean = false;
  styleDialog: any = { width: '50vw' };
  @Output() close: EventEmitter<any> = new EventEmitter();
  showModal: boolean = true;
  showInfoJob: boolean = false;
  positionDialog: string = '';
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  images: any = [
    {
      previewImageSrc: '../../../assets/img/slideImage2.jpg',
      thumbnailImageSrc: '../../../assets/img/slideImage2.jpg',
      alt: 'Description for Image 15',
      title: 'Title 15',
    },
    {
      previewImageSrc: '../../../assets/img/slideImage3.jpg',
      thumbnailImageSrc: '../../../assets/img/slideImage3.jpg',
      alt: 'Description for Image 15',
      title: 'Title 15',
    },
    {
      previewImageSrc: '../../../assets/img/slideImage1.jpg',
      thumbnailImageSrc: '../../../assets/img/slideImage1.jpg',
      alt: 'Description for Image 15',
      title: 'Title 15',
    },
  ];

  ngOnInit() {}

  showDialogJob() {
    this.showModal = false
    this.showInfoJob = true
    this.positionDialog = 'left'
  }

  closeModalInfoJob() {
    this.showModal = true
    this.showInfoJob = false
    this.positionDialog = ''
  }
}
