import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pool } from '../../classes/pool/pool';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  constructor(private httpClient: HttpClient) { }

  public getPools(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pools/getPools');
  }

  public getPoolsName(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pools/getPoolsName');
  }

  public getPoolsDistinct(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pools/getPoolsDistinct');
  }

  public getPoolStatus(): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pools/getPoolStatus');
  }

  public getPool(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.api + 'pools/getPool/'+id);
  }

  public addPool(pool: Pool) {
    return this.httpClient.post<Pool>(environment.api + 'pools/addPool/', pool);
  }

  public modPool(id: number, pool: Pool) {
    return this.httpClient.post<Pool>(environment.api + 'pools/editPool/'+id, pool);
  }
}
