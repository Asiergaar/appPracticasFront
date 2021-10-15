import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../classes/token';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor(private httpClient: HttpClient) { }

  public getTokens(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/tokens/getTokens');
  }

  public getToken(id: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/tokens/getToken/'+id);
  }

  public addToken(token: Token) {
    return this.httpClient.post<Token>('http://localhost:3000/tokens/addToken/', token);
  }

  public modToken(id: number, token: Token) {
    return this.httpClient.post<Token>('http://localhost:3000/tokens/editToken/'+id, token);
  }
}
