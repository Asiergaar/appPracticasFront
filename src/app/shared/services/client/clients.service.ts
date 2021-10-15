import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../classes/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  public getClients(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'clients/getClients');
  }

  public getClient(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'clients/getClient/'+id);
  }

  public addClient(client: Client) {
    return this.httpClient.post<Client>(environment.api + 'clients/addClient/', client);
  }

  public modClient(id: number, client: Client) {
    return this.httpClient.post<Client>(environment.api + 'clients/editClient/'+id, client);
  }
}
