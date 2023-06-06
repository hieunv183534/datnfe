import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  @Input() image: any;

  constructor() { }

  ngOnInit() {
  }

}
