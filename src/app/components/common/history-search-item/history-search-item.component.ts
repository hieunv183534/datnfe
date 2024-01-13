import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/services/admin.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-history-search-item',
  templateUrl: './history-search-item.component.html',
  styleUrls: ['./history-search-item.component.css']
})
export class HistorySearchItemComponent implements OnInit {
  @Input() typeSearch?: number;
  @Input() typeProfile?: any;
    constructor(
        private messageService: MessageService,
        private eventService: EventService,
        private router: Router,
        private adminService: AdminService
      ) { }

      ngOnInit() {
    }
}
