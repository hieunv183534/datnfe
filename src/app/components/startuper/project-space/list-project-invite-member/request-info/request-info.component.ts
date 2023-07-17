import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.css']
})
export class RequestInfoComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() projectId: string = "";
  @Output() close: EventEmitter<any> = new EventEmitter();

  formRequestInfo: FormGroup = this.fb.group({});

  fields: any = FsiValues.fields;
  areas: any = FsiValues.areas;
  availableTimes: any = FsiValues.availableTimes;
  personalities: any = FsiValues.personalities;
  skills: any = FsiValues.skills;
  yearOfExps: any = FsiValues.yearOfExps;
  jobs: any = FsiValues.jobs;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formRequestInfo = this.fb.group({
      locations: [[], []],
      jobs: [[], []],
      workingPlace: [null, []],
      describe: [null, []],
      fields: [[], []],
      speciality: [null, []],
      personalities: [[], []],
      skills: [[], []],
      workingExperience: [null, []],
      activity: [null, []],
      certificateAndAward: [null, []],
      yearOfExps: [[], []],
      availableTimes: [[], []],
      projectId: [this.projectId, []]
    });

    this.projectService.getProjectRequestStartuperInfo(this.projectId).then((res: any) => {
      if (res.data != null)
        this.formRequestInfo.patchValue(res.data);
    }).catch((err: any) => {

    });
  }

  save() {
    this.projectService.updateProjectRequestStartuperInfo(this.formRequestInfo.value).then((res: any) => {
      this.close.emit();
    }).catch((err: any) => {

    });
  }

}
