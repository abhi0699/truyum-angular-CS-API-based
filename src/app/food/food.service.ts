import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MenuItem } from '../food-item';
import { AuthService } from '../site/auth.service';
import { LoggedUserInfo } from '../site/user-info';

@Injectable({
  providedIn: 'root'
})
export class FoodService{

  adminUrl: string = 'http://localhost:52462/api/Admin/';
  customerUrl: string = 'http://localhost:52462/api/Customer/';
  anonymousUrl: string = 'http://localhost:52462/api/AnonymousUser/';
  url: string;
  token: string;
  head: HttpHeaders;
  loggedUser: LoggedUserInfo
  constructor(private http: HttpClient, private auth: AuthService ) {
   
  }

  genUrl(loggedUser){
    if(loggedUser==undefined)
      this.url = this.anonymousUrl;
    else if(this.auth.getUserType()=='Admin')
      this.url = this.adminUrl;
    else if(this.auth.getUserType()=='Customer')
      this.url = this.customerUrl;

    this.token = this.auth.getToken();
    console.log(this.auth.getUserType());
    console.log(loggedUser);
    if(loggedUser!=undefined)
    this.head = new HttpHeaders({  
      "Authorization": "bearer "+ this.token
    });
  }

  public get(){
    return this.http.get<MenuItem[]>(this.url, {headers:this.head})
  }

  public searchItem(name: string){
    return this.http.get<MenuItem[]>(this.url+'search/'+ name, {headers:this.head})
  }

  public editItem(item: MenuItem) {
    return this.http.put(this.url, item, {headers: this.head});
  }

  getItemById(itemId: number){
    return this.http.get<MenuItem>(this.url+itemId, {headers:this.head})
  }

  date(DOL: Date): Date{
    let dt: string = DOL.toString();
    return new Date(dt.substring(0,10));
  }

}
