import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-for-investor',
  templateUrl: './project-for-investor.component.html',
  styleUrls: ['./project-for-investor.component.css']
})
export class ProjectForInvestorComponent implements OnInit {

  formSearch: FormGroup =  this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
