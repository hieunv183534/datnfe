import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  filterObject: any = {};
  categoryCode: string = '';

  formSearch: FormGroup = this.fb.group({});

  admins: any[] = [];
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.formSearch = this.fb.group({
      filter: ["", []],
      isActive: [false, []]
    });
  }

  ngOnInit() {
    this.getListAdmin();
  }

  getListAdmin(reset: boolean = false) {
    if (reset) { this.page = 1; }

    this.adminService.getListAdmin((this.page - 1) * this.pageSize,
      this.pageSize, this.formSearch.value.isActive, this.formSearch.value.filter).then((res: any) => {
        this.totalRecords = res.data.totalCount;
        this.admins = res.data.items;
      }).catch((err: any) => {

      });
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
    this.getListAdmin();
  }

  onSearchSubmit() {
    this.getListAdmin(true);
  }

  acceptAdmin(admin: any) {
    this.adminService.acceptAdmin(admin.id).then((res: any) => {
      this.messageService.add({ key: "toast", severity: 'success', summary: "SUCCESS", detail: "Duyệt admin thành công!" });
      this.getListAdmin();
    }).catch((err: any) => {
      this.messageService.add({ key: "toast", severity: 'error', summary: "FAILED", detail: "Duyệt admin thất bại!" });
    });
  }

  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin.id).then((res: any) => {
      this.messageService.add({ key: "toast", severity: 'success', summary: "SUCCESS", detail: "Xóa admin thành công!" });
      this.getListAdmin();
    }).catch((err: any) => {
      this.messageService.add({ key: "toast", severity: 'error', summary: "FAILED", detail: "Xóa admin thất bại!" });
    });
  }
}
