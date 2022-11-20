import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_ROOT: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  post(url: any, body: any, params?: any): any {
    if(params !== null || params !== undefined){
      return this.httpClient.post(
        this.API_ROOT + url,
        body,
        params
      );
    } else {
      return this.httpClient.post(
        this.API_ROOT + url,
        body
      )
    }
  }

  put(url: any, body: any, params?: any): any {
    if(params !== null || params !== undefined){
      return this.httpClient.put(
        this.API_ROOT + url,
        body,
        params
      )
    } else {
      return this.httpClient.put(
        this.API_ROOT + url,
        body
      )
    }
  }

  get(url: any, params?: any): any {
    if(params !== null || params !== undefined){
      return this.httpClient.get(
        this.API_ROOT + url,
        params
      )
    } else {
      return this.httpClient.get(
        this.API_ROOT + url
      )
    }
  }

  delete(url: any, params?: any): any {
    if(params !== null || params !== undefined){
      return this.httpClient.delete(
        this.API_ROOT + url,
        params
      )
    } else {
      return this.httpClient.delete(
        this.API_ROOT + url
      )
    }
  }
}
