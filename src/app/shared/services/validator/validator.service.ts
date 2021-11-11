import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../../classes/client/client';
import { Exchange } from '../../classes/exchange/exchange';
import { Token } from '../../classes/token/token';
import { Pair } from '../../classes/pair/pair';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private httpClient: HttpClient) {}

  public checkClient(client: Client): Observable<any> {
    return this.httpClient.post<Client>(environment.api + 'validator/checkClient/', client);
  }

  public checkExchange(exchange: Exchange): Observable<any> {
    return this.httpClient.post<Exchange>(environment.api + 'validator/checkExchange/', exchange);
  }

  public checkToken(token: Token): Observable<any> {
    return this.httpClient.post<Token>(environment.api + 'validator/checkToken/', token);
  }

  public checkPair(pair: Pair): Observable<any> {
    return this.httpClient.post<Pair>(environment.api + 'validator/checkPair/', pair);
  }
}
