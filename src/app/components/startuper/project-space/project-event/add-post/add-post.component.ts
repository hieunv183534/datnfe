import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostToProjectDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();

  files: any;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }


  submit() {
    console.log(this.files);
    let input = new PostToProjectDto();
    input.content = "conewfwefw";
    input.fileIds = ["3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa5"];
    input.projectId = "3a0bc28e-2aab-53b8-ad56-30ed561eb1f0";
    input.location = "hn"

    let _files = [];
    for (var i = 0; i < this.files.length; i++) {
      _files.push(this.files[i]);
    }
    this.projectService.postToProject(input, _files).then((res: any) => {

    }).catch((err: any) => {

    });
  }

  onFileChange(e: any) {
    console.log(e.target.files);
    this.files = e.target.files;
  }
}
