import { Injectable } from '@angular/core';
import { User } from './user';
import { LoggedUserInfo } from './user-info';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  loggedInUser: User;
  loggedUser: LoggedUserInfo;
  url: string ='http://localhost:52462/api/Auth/';
  constructor(
    private userService: UserService,
    private http: HttpClient
  ){}

  authenticateUser(user: User) {
    var head = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'Accept': 'application/json',
      'observe': 'body'
    });
    return this.http.post<LoggedUserInfo>(this.url+ user.userName, JSON.stringify(user.password),{headers: head});
  }

  saveUserDetails(){
    window.localStorage.setItem('token',this.loggedUser.token);
    window.localStorage.setItem('username', this.loggedUser.userName);
    window.localStorage.setItem('userid', this.loggedUser.userId.toString());
    window.localStorage.setItem('usertype', this.loggedUser.isAdmin?"Admin":"Customer");
  }

  getToken(){
    return window.localStorage.getItem('token');
  }

  getUsername(){
    return window.localStorage.getItem('username');
  }

  getUserId(){
    return window.localStorage.getItem('userid');
  }

  getUserType(){
    return window.localStorage.getItem('usertype');
  }

}