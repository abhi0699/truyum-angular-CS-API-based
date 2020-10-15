import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/food-item';
import { AuthService } from 'src/app/site/auth.service';
import { LoggedUserInfo } from 'src/app/site/user-info';

@Component({
  selector: 'app-food-item-info',
  templateUrl: './food-item-info.component.html',
  styleUrls: ['./food-item-info.component.css']
})
export class FoodItemComponent implements OnInit {

  @Input() item: MenuItem;
  @Input() loggedInUser: LoggedUserInfo;
  @Output() onAdding: EventEmitter<number> = new EventEmitter<number>();
  admin: boolean;
  itemAdded: boolean;

  constructor(private authService: AuthService) {
    this.loggedInUser = authService.loggedUser;
    if(this.loggedInUser==undefined || !this.loggedInUser.isAdmin)
      this.admin = false;
    else
    this.admin = true;
  }

  ngOnInit(): void {
  }

  addToCart(itemId: number):void{
    this.itemAdded = true;
    this.onAdding.emit(itemId);
  }
}
