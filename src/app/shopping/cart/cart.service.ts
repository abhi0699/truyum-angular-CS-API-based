import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from 'src/app/food-item';
import { FoodService } from 'src/app/food/food.service';
import { AuthService } from 'src/app/site/auth.service';
import { LoggedUserInfo } from 'src/app/site/user-info';
import { Cart } from '../cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;
  userId: number;
  url: string = 'http://localhost:52462/api/Cart/';
  token: string;
  head: HttpHeaders;


  constructor(private foodService: FoodService, private http: HttpClient,private auth: AuthService) {
  }

  genHeaders(user: LoggedUserInfo){
    this.token = this.auth.getToken();
    this.head = new HttpHeaders({
      'Authorization': 'bearer '+ this.token
  })
}

  getCart(userId: number){
    return this.http.get<Cart[]>(this.url+userId, {headers: this.head});
  }

  addToCart(itemId: number, userId: number){
    return this.http.post(this.url+userId, itemId, {headers: this.head});
  }

  deleteFromCart(cart: Cart){
    return this.http.delete(this.url+cart.cartId, {headers: this.head});
  }
}
