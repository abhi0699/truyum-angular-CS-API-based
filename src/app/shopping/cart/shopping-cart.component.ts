import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/food-item';
import { FoodService } from 'src/app/food/food.service';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { LoggedUserInfo } from 'src/app/site/user-info';
import { Cart } from '../cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Array<Cart>;
  user: LoggedUserInfo;
  total: number;
  isDel: boolean;

  constructor(private cartService: CartService, private auth: AuthService, 
    private route: Router, private foodService: FoodService) { 
    this.user = auth.loggedUser;
    this.getCart(this.user.userId);
  }

  getCart(userId: number){
    this.cart = new Array<Cart>();
    this.total = 0;
    let carts: Cart[] = [];
    this.cartService.genHeaders(this.user);
    this.cartService.getCart(userId).subscribe(
      res =>{
        carts=res;
        carts.forEach(c => {
          c.foodItem.dol = this.foodService.date(c.foodItem.dol);
          this.cart.push(c);
          this.total += c.foodItem.price;
        });
      },
      err => console.log(err)
    );
  }

  clicked(cartItem: Cart){
    this.cartService.genHeaders(this.user);
    this.cartService.deleteFromCart(cartItem).subscribe(
      res => {
        this.isDel=true;
        this.getCart(this.user.userId);
      },
      err => console.log(err)
    );
  }

  ngOnInit(): void {
    if(this.user==undefined)
      this.route.navigateByUrl('/menu-item-list');
  }

}
