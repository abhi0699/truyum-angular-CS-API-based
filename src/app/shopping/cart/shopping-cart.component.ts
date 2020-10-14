import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/food-item';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { Cart } from '../cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart;
  user: User;
  deleted: boolean;

  constructor(private cartService: CartService, private authService: AuthService, private route: Router) { 
    this.cart = new Cart();
    this.cart.menuItemList = new Array<MenuItem>();
    let cartMap = cartService.getCartItems(1);
    if(cartMap.size!=0)
    this.cart = cartMap.get(1);
    this.user = authService.loggedInUser;
  }

  clicked(itemId: number){
    this.cartService.deleteFromCart(itemId);
    let cartMap = this.cartService.getCartItems(1);
    if(cartMap.size!=0)
    this.cart = cartMap.get(1);
    this.deleted = true;
    
  }
  ngOnInit(): void {
    if(this.user==undefined)
      this.route.navigateByUrl('/menu-item-list');
  }

}
