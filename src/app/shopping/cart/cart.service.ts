import { Injectable } from '@angular/core';
import { MenuItem } from 'src/app/food-item';
import { FoodService } from 'src/app/food/food.service';
import { Cart } from '../cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;
  cartMap: Map<number, Cart>;
  userId: number;

  constructor(private foodService: FoodService) {
    this.cart = new Cart();
    this.cartMap = new Map<number, Cart>();
  }

  generateCart(): void {

    let cartItemList = this.foodService.cartMenuItemList;

    if (this.userId = this.foodService.userId) {
      cartItemList.forEach((i) => {
        this.cart.menuItemList.push(i);
      });

      this.cart.calculateTotal();

      this.cartMap.set(this.userId, this.cart);
      this.foodService.cartMenuItemList = new Array<MenuItem>();
    }

  }
  getCartItems(userId: number): Map<number, Cart> {
    this.generateCart();
    this.userId = userId;
    return this.cartMap;
  }

  deleteFromCart(itemId: number): void{
    let newList: Array<MenuItem> = new Array<MenuItem>();
    this.cart.menuItemList.forEach(m => {
      if(m.itemId!=itemId)
        newList.push(m);
    });
    this.cart.menuItemList = new Array<MenuItem>();
    this.cart.menuItemList = newList;

    this.cart.calculateTotal();
    
    this.cartMap.set(this.userId, this.cart);
  }

}
