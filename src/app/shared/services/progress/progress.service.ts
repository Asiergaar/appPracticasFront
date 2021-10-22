import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progress } from '../../classes/progress/progress';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private httpClient: HttpClient) { }

  public addProgress() {
    return this.httpClient.get<any>(environment.api + 'progress/addProgress/');
  }
}
