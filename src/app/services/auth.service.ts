import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/admin';
  }

  login(username: string, password: string, role: number) {
    return this.BaseAPIConfig.post(`${this.apiController}/login`, { username, password, role });
  }

  register(body: any) {
    return this.BaseAPIConfig.post(`${this.apiController}/register`, body);
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/change-password`, { oldPassword, newPassword });
  }

}
