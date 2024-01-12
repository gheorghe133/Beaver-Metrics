import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonFileUrl = '././assets/data.json';
  private jsonUserFileUrl = '././assets/user.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.jsonFileUrl);
  }

  getUserData(): Observable<any> {
    return this.http.get(this.jsonUserFileUrl);
  }
}
