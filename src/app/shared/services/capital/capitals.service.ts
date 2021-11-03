import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Capital } from '../../classes/capital/capital';
import { NewCapital } from '../../classes/newcapital/newcapital';
import { Progress } from '../../classes/progress/progress';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapitalsService {

  constructor(private httpClient: HttpClient) { }

  public addCapitals(progress: Progress) {
    return this.httpClient.post<Progress>(environment.api + 'capitals/addCapitals/', progress);
  }

  public newCapital(newCapital: NewCapital) {
    return this.httpClient.post<Progress>(environment.api + 'capitals/newCapital/', newCapital);
  }
}
