import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CreateUpdateProjectDto, GetListProjectForInvestorDto, GetListProjectForStartuperDto, ProjectHistoryEventDto } from '../model/project.class';
import { RoleInProject } from '../model/enum';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router, _messageService);
    this.apiController = 'fsi/project';
  }

  insertProjectAsync(input: CreateUpdateProjectDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/project`, input);
  }

  updateProjectAsync(input: CreateUpdateProjectDto) {
    return this.BaseAPIConfig.put(`${this.apiController}/project`, input);
  }

  addUserToProject(projectId: string, userId: string, role: RoleInProject) {
    return this.BaseAPIConfig.post(`${this.apiController}/user-to-project`, { projectId, userId, role });
  }

  getProjectById(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-by-id/${projectId}`);
  }

  addProjectHistoryEvent(input: ProjectHistoryEventDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/project-history-event`, input);
  }

  getListProjectForStartuper(input: GetListProjectForStartuperDto) {
    let _filter = input.filter ? `&filter=${input.filter}` : "";
    let _stage = input.stage ? `&stage=${input.stage}` : "";
    let _field = input.field ? `&field=${input.field}` : "";
    let _area = input.area ? `&area=${input.area}` : "";
    let _availableTime = input.availableTime? `&area=${input.availableTime}` : "";
    return this.BaseAPIConfig.get(`${this.apiController}/project-for-startuper?skipCount=${input.skipCount}&maxResultCount=${input.maxResultCount}${_filter}${_stage}${_field}${_area}${_availableTime}`);
  }

  getListProjectForInvestor(input: GetListProjectForInvestorDto) {
    let _filter = input.filter ? `&filter=${input.filter}` : "";
    let _stage = input.stage ? `&stage=${input.stage}` : "";
    let _field = input.field ? `&field=${input.field}` : "";
    let _area = input.area ? `&area=${input.area}` : "";
    return this.BaseAPIConfig.get(`${this.apiController}/project-for-investor?skipCount=${input.skipCount}&maxResultCount=${input.maxResultCount}${_filter}${_stage}${_field}${_area}`);
  }

  getProjectByUser(userId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-by-user/${userId}`);
  }

  uploadAvatar(file: any, projectId: string) {
    let formData = new FormData();
    formData.append("file", file);
    return this.BaseAPIConfig.post(`${this.apiController}/upload-avatar/${projectId}`, formData);
  }
}
