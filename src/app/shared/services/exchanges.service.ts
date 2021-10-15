import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exchange } from '../classes/exchange';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  constructor(private httpClient: HttpClient) { }

  public getExchanges(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/Exchanges/getExchanges');
  }

  public getExchange(id: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/Exchanges/getExchange/'+id);
  }

  public addExchange(exchange: Exchange) {
    return this.httpClient.post<Exchange>('http://localhost:3000/Exchanges/addExchange/', exchange);
  }

  public modExchange(id: number, exchange: Exchange) {
    return this.httpClient.post<Exchange>('http://localhost:3000/Exchanges/editExchange/'+id, exchange);
  }
}
