import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../classes/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor(private httpClient: HttpClient) { }

  public getTokens(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'tokens/getTokens');
  }

  public getToken(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'tokens/getToken/'+id);
  }

  public addToken(token: Token) {
    return this.httpClient.post<Token>(environment.api + 'tokens/addToken/', token);
  }

  public modToken(id: number, token: Token) {
    return this.httpClient.post<Token>(environment.api + 'tokens/editToken/'+id, token);
  }
}
