import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/food-item';
import { AuthService } from 'src/app/site/auth.service';

@Component({
  selector: 'app-food-item-info',
  templateUrl: './food-item-info.component.html',
  styleUrls: ['./food-item-info.component.css']
})
export class FoodItemComponent implements OnInit {

  @Input() item: MenuItem;
  @Input() loggedInUser;
  @Output() onAdding: EventEmitter<number> = new EventEmitter<number>();
  admin: boolean;
  itemAdded: boolean;

  constructor(private authService: AuthService) {
    this.loggedInUser = authService.loggedInUser;
    if(this.loggedInUser!=undefined){
    this.admin=this.loggedInUser.admin;
  }
    else
    this.admin=false;
  }

  ngOnInit(): void {
  }

  addToCart(itemId: number):void{
    this.itemAdded = true;
    this.onAdding.emit(itemId);
  }
}
