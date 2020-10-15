import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { LoggedUserInfo } from 'src/app/site/user-info';
import { MenuItem } from '../../../food-item';
import { FoodService } from '../../food.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {

  menuItemList: Array<MenuItem>;
  user: LoggedUserInfo;

  constructor(private menuService: FoodService, private authService: AuthService, private route: Router, private foodService: FoodService) {
    this.menuItemList = new Array<MenuItem>();
    this.user = authService.loggedUser;
    this.getFoodItems();
  }

  getFoodItems() {
    this.menuItemList = new Array<MenuItem>();
    let items: MenuItem[] = [];
    this.foodService.genUrl(this.user);
    this.foodService.get().subscribe(
      i => {
        items = i;
        items.forEach(x => {
          this.menuItemList.push(x);
        });
      },
      err => console.log(err)
    );
  }

  getMenuItems($event): void {
    this.menuItemList = new Array<MenuItem>();
    if (($event as string).length != 0){
      let items: MenuItem[] = [];
      this.foodService.genUrl(this.user);
      this.foodService.searchItem($event as string).subscribe(
        m => {
          items = m;
          items.forEach(x => {
            x.DOL = this.foodService.date(x.DOL);
            this.menuItemList.push(x);
          });
        },
        err => console.log(err)
      );
    }
    else
    this.getFoodItems();
  }

  addToCart($event): void {
    
  }

  ngOnInit() {
  }

}
