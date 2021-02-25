import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly PATH: string = 'auth';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(login: Login): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}${this.PATH}`, login);
  }
}
