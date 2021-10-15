import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pair } from '../classes/pair';

@Injectable({
  providedIn: 'root'
})
export class PairsService {

  constructor(private httpClient: HttpClient) { }

  public getPairs(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/pairs/getPairs');
  }

  public getPairsName(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/pairs/getPairsName');
  }

  public getPair(id: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/pairs/getPair/'+id);
  }

  public addPair(pair: Pair) {
    return this.httpClient.post<Pair>('http://localhost:3000/pairs/addPair/', pair);
  }

  public modPair(id: number, pair: Pair) {
    return this.httpClient.post<Pair>('http://localhost:3000/pairs/editPair/'+id, pair);
  }
}
