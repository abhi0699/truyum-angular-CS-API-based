import { Injectable, OnInit } from '@angular/core';
import { MenuItem } from '../food-item';

@Injectable({
  providedIn: 'root'
})
export class FoodService{


  menuItemList: Array<MenuItem>;
  searchItemList: Array<MenuItem>;
  cartMenuItemList: Array<MenuItem>;
  editedMenuItems: Array<MenuItem>;
  userId: number;

  constructor() {
    this.menuItemList = new Array<MenuItem>();
    this.getFoodItems();
    this.searchItemList = new Array<MenuItem>();
  }

  getItem(name: string): Array<MenuItem> {
    this.searchItemList = new Array<MenuItem>();
    name = name.toUpperCase().trim();
    for (const menu of this.menuItemList) {
      let tempFoodName = menu.foodName.toUpperCase();
      if (tempFoodName.startsWith(name)) {
        this.searchItemList.push(menu);
        break;
      }
      else {
        this.searchItemList = new Array<MenuItem>();
      }
    }
    return this.searchItemList;
  }

  getItemById(itemId: number): MenuItem{
    let menuItem: MenuItem;
    this.menuItemList.forEach(x =>{
      if(x.itemId==itemId){
        menuItem = x;
      }
    });
    return menuItem;
  }

  setItem(item: MenuItem){
    this.editedMenuItems = new Array<MenuItem>();
    let menuItems: Array<MenuItem> = new Array<MenuItem>();
    this.menuItemList.forEach(x =>{
      
      if(x.itemId==item.itemId){
        menuItems.push(item);
      }else{
        menuItems.push(x);
      }
    });
    this.editedMenuItems = menuItems;
  }

  getFoodItems(): Array<MenuItem> {
    this.menuItemList = new Array<MenuItem>();
    this.searchItemList = new Array<MenuItem>();

    let menuItem: MenuItem = new MenuItem();

    menuItem.itemId = 1;
    menuItem.foodName = 'Sandwich';
    menuItem.isActive = true;
    menuItem.price = 99;
    menuItem.category = 'Main Course';
    menuItem.freeDelv = true;
    menuItem.DOL = new Date('2017-03-15');
    menuItem.imageURL = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80';
    this.menuItemList.push(menuItem);

    menuItem = new MenuItem();
    menuItem.itemId = 2;
    menuItem.foodName = 'Pizza';
    menuItem.isActive = true;
    menuItem.price = 149;
    menuItem.category = 'Main Course';
    menuItem.freeDelv = false;
    menuItem.DOL = new Date('2017-12-23');
    menuItem.imageURL = 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80';
    this.menuItemList.push(menuItem);

    menuItem = new MenuItem();
    menuItem.itemId = 3;
    menuItem.foodName = 'Burger';
    menuItem.isActive = true;
    menuItem.price = 129;
    menuItem.category = 'Main Course';
    menuItem.freeDelv = false;
    menuItem.DOL = new Date('2017-08-21');
    menuItem.imageURL = 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80';
    this.menuItemList.push(menuItem);

    menuItem = new MenuItem();
    menuItem.itemId = 4;
    menuItem.foodName = 'French Fries';
    menuItem.isActive = false;
    menuItem.price = 57;
    menuItem.category = 'Starter';
    menuItem.freeDelv = true;
    menuItem.DOL = new Date('2017-07-02');
    menuItem.imageURL = 'https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';
    this.menuItemList.push(menuItem);

    menuItem = new MenuItem();
    menuItem.itemId = 5;
    menuItem.foodName = 'Chocolate Brownie';
    menuItem.isActive = true;
    menuItem.price = 32;
    menuItem.category = 'Dessert';
    menuItem.freeDelv = true;
    menuItem.DOL = new Date('2019-11-02');
    menuItem.imageURL = 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=730&q=80';
    this.menuItemList.push(menuItem);

    return this.menuItemList;
  }

  addToCart(itemId: number, userId: number): void {
    if(this.cartMenuItemList==undefined)
    this.cartMenuItemList = new Array<MenuItem>();
    this.userId = userId;
    this.menuItemList.forEach(item => {
      if (item.itemId == itemId)
        this.cartMenuItemList.push(item);
    });
  }

  

}
