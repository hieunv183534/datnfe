import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CreateStartuperDto, GetListStartuperForProjectDto } from '../model/startuper.class';
import { UpdateBaseInfoDto } from '../model/user.class';

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

  getMyInfo() {
    return this.BaseAPIConfig.get(`${this.apiController}/my-info`);
  }

  uploadAvatar(file: any) {
    let formData = new FormData();
    formData.append("file", file);
    return this.BaseAPIConfig.post(`${this.apiController}/upload-avatar`, formData);
  }

  updateBaseInfo(input: UpdateBaseInfoDto) {
    return this.BaseAPIConfig.put(`${this.apiController}/base-info`, input);
  }

  getListStartuper(input: GetListStartuperForProjectDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-list-startuper`, input);
  }

  getMyProjects() {
    return this.BaseAPIConfig.get(`${this.apiController}/my-projects`);
  }

  requestFriendToOrtherStartuper(targetId?: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/request-friend-to-orther-startuper/${targetId}`, {});
  }

  acceptRequestFriendFromOrtherStartuper(targetId?: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/accept-request-friend-from-orther-startuper/${targetId}`, {});
  }

  cancelRequestToOrtherStartuper(targetId?: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/cancel-request-to-orther-startuper/${targetId}`, {});
  }

  getUserDetail(userId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/user-detail/${userId}`);
  }
}
