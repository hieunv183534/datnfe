import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminDto, RegisterAdminDto } from '../model/admin.class';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/admin';
  }

  login(username: string, password: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/login`, {username, password});
  }

  register(input: RegisterAdminDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/register`, input);
  }

  getListAdmin(skipCount: number, maxResultCount: number, isActive: boolean, filter: string = ""){
    return this.BaseAPIConfig.get(`${this.apiController}/admin?skipCount=${skipCount}&maxResultCount=${maxResultCount}&isActive=${isActive}&filter=${filter}`);
  }

  acceptAdmin(adminId: string){
    return this.BaseAPIConfig.post(`${this.apiController}/accept-admin/${adminId}`, {});
  }

  deleteAdmin(adminId: string){
    return this.BaseAPIConfig.delete(`${this.apiController}/admin/${adminId}`);
  }
}
