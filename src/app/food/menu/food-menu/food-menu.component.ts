import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { MenuItem } from '../../../food-item';
import { FoodService } from '../../food.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {

  menuItemList: Array<MenuItem>;
  user: User;

  constructor(private menuService: FoodService, private authService: AuthService, private route: Router) {
    this.menuItemList = new Array<MenuItem>();
    this.user = authService.loggedInUser;
    if(this.user!=undefined && this.user.admin)
    this.menuItemList = menuService.editedMenuItems == undefined ? menuService.getFoodItems() : menuService.editedMenuItems;
    else{
      let today = new Date();
      menuService.getFoodItems().forEach(f => {
        if(f.isActive && f.DOL < today)
          this.menuItemList.push(f);
      });
    }
  }

  getMenuItem($event): void {
    this.menuItemList = new Array<MenuItem>();
    if (($event as string).length != 0)
      this.menuItemList = this.menuService.getItem($event);
    else {
      this.menuItemList = new Array<MenuItem>();
      this.menuService.getFoodItems().forEach(f => {
        if(f.isActive)
          this.menuItemList.push(f);
      });
    }

  }

  addToCart($event): void {
    this.menuService.addToCart($event, 1);
  }

  ngOnInit(): void {
    if(this.user==undefined)
      this.route.navigateByUrl('/menu-item-list');
    
  }

}
