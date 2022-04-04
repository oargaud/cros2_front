import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from '../constante';
import { UserAuthService } from './user-auth.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = Constante.API_URL;

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public createUser(user) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', user, {
      headers: this.requestHeader,
    });
  }

  public saveUser(user) {
    return this.httpclient.post(this.PATH_OF_API + '/saveUser', user);
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
      return isMatch;
    }
  }

  public getUsers(){
    return this.httpclient.get(this.PATH_OF_API + '/users');
  }

  public getUser(username){
    return this.httpclient.get(this.PATH_OF_API + '/user/' + username);
  }

  public delUser(username){
    return this.httpclient.delete(this.PATH_OF_API + '/delete/' + username);
  }

  public getRoles(){
    return this.httpclient.get(this.PATH_OF_API + '/roles');
  }

}
