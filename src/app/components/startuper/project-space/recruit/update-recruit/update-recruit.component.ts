import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RecruitDto } from 'src/app/model/project.class';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-update-recruit',
  templateUrl: './update-recruit.component.html',
  styleUrls: ['./update-recruit.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class UpdateRecruitComponent implements OnInit {
  skills: any = FsiValues.skills;
  workTypes: any = FsiValues.workTypes;
  personalities: any = FsiValues.personalities;
  availableTimes: any = FsiValues.availableTimes;
  yearOfExps: any = FsiValues.yearOfExps;
  areas: any = FsiValues.areas;
  degrees: any = FsiValues.degrees;
  specializes: any = FsiValues.specializes;
  formRecruit: FormGroup = this.fb.group({});
  handleSubmit: boolean = false;
  isLoading: boolean = false;
  @Input() recruit!: RecruitDto;
  @Input() projectId: string = '';
  @Output() fetchData = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService

  ) { }
  ngOnInit() {
    this.formRecruit = this.fb.group({
      title: [this.recruit.title, [Validators.required]],
      specialize: [this.recruit.specialize, [Validators.required]],
      quantity: [this.recruit.quantity, [Validators.required]],
      location: [this.recruit.location, [Validators.required]],
      workingForm: [this.recruit.workingForm, [Validators.required]],
      workingAddress: [this.recruit.workingAddress, []],
      workingTimes: [this.recruit.workingTimes, [Validators.required]],
      incomeMode: [this.recruit.incomeMode, [Validators.required]],
      duration: [new Date(this.recruit.duration ?? ''), [Validators.required]],
      description: [this.recruit.description, []],
      yearOfExps: [this.recruit.yearOfExps, []],
      degree: [this.recruit.degree, []],
      skills: [this.recruit.skills, []],
      personalities: [this.recruit.personalities, []],
      otherDetail: [this.recruit.otherDetail, []],
      otherRequest: [this.recruit.otherRequest, []],
      projectId: [this.recruit.projectId, []],
    })
  }
  submit() {
    this.handleSubmit = true;
    if (this.formRecruit.valid) {
      this.isLoading = true;
      this.formRecruit.value.projectId = this.projectId;
      this.formRecruit.value.id = this.recruit.id;
      this.projectService.updateRecruit(this.formRecruit.value).then((res: any) => {
        this.fetchData.emit();
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật bài đăng thành công!",
        });
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Cập nhật thất bại!",
        });
      }).finally(() => this.isLoading = false);
    }
  }
}
