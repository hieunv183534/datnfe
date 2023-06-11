import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CreateStartuperDto } from '../model/startuper.class';

@Injectable({
  providedIn: 'root'
})
export class StartuperService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/startuper';
  }

  insertStartuperAsync(input: CreateStartuperDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/startuper`, input);
  }

  getCheckIsNewProfile() {
    return this.BaseAPIConfig.get(`${this.apiController}/check-is-new-profile`);
  }

  uploadAvatar(file: any) {
    let formData = new FormData();
    formData.append("file", file);
    return this.BaseAPIConfig.post(`${this.apiController}/upload-avatar`, formData);
  }
}
