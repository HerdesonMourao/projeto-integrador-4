import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cards } from '../models/Cards';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private api: ApiService
  ) { }

  store(cards: Cards): Observable<Cards> {
    return this.api.post('card', cards);
  }

  index(id: number): Observable<Cards[]> {
    return this.api.get(`card/${id}/all`);
  }

  show(id: number): Observable<Cards> {
    return this.api.get('card/' + `${id}`);
  }

  update(cards: Cards, id: any): Observable<any> {
    return this.api.put(`card/${id}`, cards);
  }

  destroy(id: number): Observable<any> {
    return this.api.delete('card/' + `${id}`);
  }
}
