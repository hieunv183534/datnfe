import { RecruitDto } from './../model/project.class';
import { WorkStatus } from './../model/enum';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddProjectCalendarEventDto, AddProjectWorkDto, CreateUpdateProjectDto, GetListProjectForInvestorDto, GetListProjectForStartuperDto, GetProjectEventsDto, PostToProjectDto, ProjectRequestStartuperInfoDto } from '../model/project.class';
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
    return this.BaseAPIConfig.post(`${this.apiController}/update-project`, input);
  }

  addUserToProject(projectId: string, userId: string, role: RoleInProject) {
    return this.BaseAPIConfig.post(`${this.apiController}/user-to-project`, { projectId, userId, role });
  }

  getProjectById(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-by-id/${projectId}`);
  }

  getTopSimilarProject(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/top-project-similar-by-project-id/${projectId}`);
  }


  getListProjectForStartuper(input: GetListProjectForStartuperDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-list-project-for-startuper`, input);
  }

  getListProjectForInvestor(input: GetListProjectForInvestorDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-list-project-for-investor`, input);
  }

  getProjectByUser(userId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-by-user/${userId}`);
  }

  uploadAvatar(file: any, projectId: string) {
    let formData = new FormData();
    formData.append("file", file);
    return this.BaseAPIConfig.post(`${this.apiController}/upload-avatar/${projectId}`, formData);
  }

  uploadFile(file: any, projectId: string, title: string, note: string, visibleForInvestor: boolean, visibleForAll: boolean) {
    let formData = new FormData();
    formData.append("file", file);
    return this.BaseAPIConfig.post(`${this.apiController}/upload-file/${projectId}?fileTitle=${title}&visibleForInvestor=${visibleForInvestor}&visibleForAll=${visibleForAll}&note=${note}`, formData);
  }

  getProjectFiles(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-files/${projectId}`);
  }

  getFileBlob(projectFileId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/get-file/${projectFileId}`, { responseType: "blob" });
  }

  getUserByUserNameForInviteToProject(filter: string, projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/user-by-user-name-for-invite-to-project/${projectId}?userName=${filter}`);
  }

  getUsersRequestToProject(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/users-request-to-project/${projectId}`);
  }

  getUsersProjectRequestTo(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/users-project-request-to/${projectId}`);
  }

  requestToUserFromProject(projectId?: string, userId?: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/request-to-user-from-project?userId=${userId}&projectId=${projectId}`, {});
  }

  requestToProject(projectId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/request-to-project/${projectId}`, {});
  }

  acceptRequestFromAProject(projectId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/accept-request-from-aProject/${projectId}`, {});
  }

  cancelRequestToAProject(projectId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/cancel-request-to-aProject/${projectId}`, {});
  }

  getMembersOfProject(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/users-of-project/${projectId}`);
  }

  acceptMemberToProject(projectId: string, userId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/accept-member-to-project?projectId=${projectId}&userId=${userId}`, {});
  }

  refuseMemberToProject(projectId: string, userId: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/refuse-member-to-project?projectId=${projectId}&userId=${userId}`, {});
  }

  postToProject(input: PostToProjectDto, imageFiles: any[]) {
    let formData = new FormData();
    imageFiles.forEach((f, i) => {
      formData.append("file" + i, f);
    });
    formData.append("Content", input.content ?? "");
    formData.append("Location", input.location ?? "");
    formData.append("ProjectId", input.projectId ?? "");
    formData.append("FileIds", JSON.stringify(input.fileIds) ?? "[]");
    formData.append("Links", JSON.stringify(input.links) ?? "[]");
    return this.BaseAPIConfig.post(`${this.apiController}/post-to-project`, formData);
  }

  getEventsOfProject(input: GetProjectEventsDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/to-get-events-of-project`, input);
  }

  getProjectCalendarEvents(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-calendar-events/${projectId}`);
  }

  addCalendarEvent(input: AddProjectCalendarEventDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/calendar-event`, input);
  }

  deleteCalendarEvent(eventId: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}/calendar-event/${eventId}`);
  }

  addWork(input: AddProjectWorkDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/work`, input);
  }

  changeWorkStatus(workId: string, newStatus: WorkStatus) {
    return this.BaseAPIConfig.post(`${this.apiController}/change-work-status/${workId}?newStatus=${newStatus}`, {});
  }

  getProjectWorks(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-works/${projectId}`);
  }

  updateProjectRequestStartuperInfo(input: ProjectRequestStartuperInfoDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/update-project-request-startuper-info`, input);
  }

  getProjectRequestStartuperInfo(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-request-startuper-info/${projectId}`);
  }
  getProjectBusinessModel(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-canvas-model/${projectId}`);
  }
  updateProjectBusinessModel(projectId: string, model: string) {
    return this.BaseAPIConfig.put(`${this.apiController}/project-canvas-model`, { projectId, model });
  }
  addRecruit(input: RecruitDto) {
    return this.BaseAPIConfig.post(`${this.apiController}/project-hiring`, input);
  }
  updateRecruit(input: RecruitDto) {
    return this.BaseAPIConfig.put(`${this.apiController}/project-hiring`, input);
  }
  getRecruitsByProjectId(projectId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-hirings/${projectId}`);
  }
  getRecruitById(projectId: string, recruitId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-hiring?projectId=${projectId}&hiringId=${recruitId}`);
  }
  deleteRecruit(projectId: string, recruitId: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}/project-hiring?projectId=${projectId}&hiringId=${recruitId}`);
  }
  getPitchDeck(projectId?: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/project-pitch-deck/${projectId}`);
  }
  addPitchDeck(files?: File[], projectId?: string) {
    let formData = new FormData();
    files?.forEach((file,index) => {
      formData.append(`file${index}`, file)
    })
    return this.BaseAPIConfig.post(`${this.apiController}/upload-pitch-deck/${projectId}`, formData);
  }
  updatePitchDeck(projectId: string, avatarFile?: any) {
    let formData = new FormData();
    formData.append("file", avatarFile);
    return this.BaseAPIConfig.put(`${this.apiController}/upload-pitch-deck/${projectId}`, formData);
  }
}
