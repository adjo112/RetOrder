import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  endpoint = environment.AuthURL;
  constructor(private http: HttpClient) {}

  VerifyAndLogIn(cred: User): Observable<any> {
    return this.http.post(this.endpoint + '/Auth', cred);
  }
}
