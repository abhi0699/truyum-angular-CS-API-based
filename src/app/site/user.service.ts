import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: Array<User>
  url: string = 'http://localhost:52462/api/user'

  constructor(private http:HttpClient) {
    this.userList = new Array<User>();
  }

  
  addUser(user: User){
    return this.http.post(this.url, user);
  }

  // getUser(userName: string): User {
  //   let user: User = new User();
  //   this.userList.forEach(x => {
  //     if (x.userName == userName)
  //       user = x;
  //   });
  //   return user;
  // }
}
