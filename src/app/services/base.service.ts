import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  BaseAPIConfig: any;

  apiController: string;

  constructor(private router: Router, private messageService: MessageService) {
    this.apiController = '';
    this.BaseAPIConfig = axios.create({
      baseURL: "http://localhost:7777/api/"
      // baseURL: "https://fsiconnectedapi.azurewebsites.net/api/"
    });

    this.BaseAPIConfig.interceptors.request.use((config: any) => {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      }
      return config;
    }, (error: any) => {
      return Promise.reject(error)
    });

    this.BaseAPIConfig.interceptors.response.use((res: any) => {
      return res;
    }, (error: any) => {
      if (this.router.url !== '/login' && error.response.status == 401) {
        this.messageService.add({ key: "toastUserView", severity: 'error', summary: "UNAUTHORIZED", detail: "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại!" });
        this.router.navigate(['/login']);
      }
      return Promise.reject(error)
    })
  }

}
