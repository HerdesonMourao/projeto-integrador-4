import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService
  ) { }

  store(user: User): Observable<User> {
    return this.api.post('user', user);
  }

  index(id: number): Observable<User[]> {
    return this.api.get(`user/${id}/all`);
  }

  show(id: number): Observable<User> {
    return this.api.get('user/' + `${id}`);
  }

  update(user: User, id: any): Observable<any> {
    return this.api.put(`user/${id}`, user);
  }

  destroy(id: number): Observable<any> {
    return this.api.delete('user/' + `${id}`);
  }

  updatePassword(id: number, user: User): Observable<User> {
    return this.api.put(`user/password/${id}`, user);
  }

  acessSystem(username: string, password: string): any {
    return this.api.post('user/acess_system', {username: username, password: password});
  }
}
