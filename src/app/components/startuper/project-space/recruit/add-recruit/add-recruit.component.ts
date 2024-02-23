import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { FsiValues } from 'src/app/shared/util/util';

@Component({
  selector: 'app-add-recruit',
  templateUrl: './add-recruit.component.html',
  styleUrls: ['./add-recruit.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddRecruitComponent implements OnInit {

  skills: any = FsiValues.skills;
  workTypes: any = FsiValues.workTypes;
  personalities: any = FsiValues.personalities;
  availableTimes: any = FsiValues.availableTimes;
  yearOfExps: any = FsiValues.yearOfExps;
  areas: any = FsiValues.areas;
  degrees: any = FsiValues.degrees;
  specializes: any = FsiValues.specializies;
  @Input() projectId: string = '';
  @Output() fetchData = new EventEmitter();
  handleSubmit: boolean = false
  isLoading: boolean = false;
  formRecruit: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService

  ) { }

  ngOnInit() {
    this.formRecruit = this.fb.group({
      title: [null, [Validators.required]],
      specialize: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      location: [null, [Validators.required]],
      workingForm: [null, [Validators.required]],
      workingAddress: [null, []],
      duration: [null, [Validators.required]],
      income: [null, [Validators.required]],
      description: [null, []],
      workingTimes: [null, [Validators.required]],
      yearOfExps: [null, []],
      degree: [null, []],
      skills: [null, []],
      personalities: [null, []],
      otherDetail: [null, []],
      otherRequest: [null, []],
      projectId: [null, []],
    })
  }
  submit() {
    // console.log(this.acceptDieuKhoan)
    this.handleSubmit = true
    if (this.formRecruit.valid) {
      this.isLoading = true;
      this.formRecruit.value.projectId = this.projectId;
      this.projectService.addRecruit(this.formRecruit.value).then((res: any) => {
        this.fetchData.emit();
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Đăng ký thành công! Hãy đăng nhập để sử dụng dịch vụ!",
        });
      }).catch((err: any) => {
        console.log(err.response);
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Lỗi",
          detail: "Đăng ký thất bại!",
        });
      }).finally(() => this.isLoading = false);;
    }
  }
}
