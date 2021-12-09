import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exchange } from '../../classes/exchange/exchange';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  constructor(private httpClient: HttpClient) { }

  public getExchanges(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'Exchanges/getExchanges');
  }

  public getExchange(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'Exchanges/getExchange/'+id);
  }

  public addExchange(exchange: Exchange) {
    return this.httpClient.post<Exchange>(environment.api + 'Exchanges/addExchange/', exchange);
  }

  public modExchange(id: number, exchange: Exchange) {
    return this.httpClient.put<Exchange>(environment.api + 'Exchanges/editExchange/'+id, exchange);
  }
}
