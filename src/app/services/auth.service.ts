import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppStateService} from "./app-state.service";
import {firstValueFrom} from "rxjs";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host: string = "http://localhost:8077/users";

  constructor(private http: HttpClient, private appStateService: AppStateService) { }

  public async login(username: string, password: string) {
    let user: any = await firstValueFrom(this.http.get(this.host + "/" + username));
    if (user.password == password) {
      let decodedJwt: any = jwtDecode(user.token);
      this.appStateService.setAuthState({
        isAuthenticated: true,
        username: username,
        roles: decodedJwt.roles,
        token: user.token
      });
      return Promise.resolve(true);
    }
    return Promise.reject("Bad credentials");
  }

}
