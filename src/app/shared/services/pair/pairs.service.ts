import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pair } from '../../classes/pair/pair';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PairsService {

  constructor(private httpClient: HttpClient) { }

  public getPairs(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pairs/getPairs');
  }

  public getPairsName(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pairs/getPairsName');
  }

  public getPair(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pairs/getPair/'+id);
  }

  public addPair(pair: Pair) {
    return this.httpClient.post<Pair>(environment.api + 'pairs/addPair/', pair);
  }

  public modPair(id: number, pair: Pair) {
    return this.httpClient.post<Pair>(environment.api + 'pairs/editPair/'+id, pair);
  }
}
