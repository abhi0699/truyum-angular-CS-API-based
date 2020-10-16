import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/food-item';
import { FoodService } from '../food.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { LoggedUserInfo } from 'src/app/site/user-info';


@Component({
  selector: 'app-food-item-edit',
  templateUrl: './food-item-edit.component.html',
  styleUrls: ['./food-item-edit.component.css']
})
export class FoodItemEditComponent implements OnInit {

  user: LoggedUserInfo;
  dateString: string;
  foodItem: MenuItem;
  inStock: string;

  
  foodItemList: Map<number,MenuItem>;

  constructor(private param: ActivatedRoute, private foodService: FoodService, public datepipe: DatePipe, private route: Router,  private authService: AuthService) {
    this.foodItemList = new Map<number, MenuItem>();
    let id: any = param.snapshot.paramMap.get('itemId');
    this.user = this.authService.loggedUser;
    this.getItemById(id as number);
    this.showUserName();
   }

   showUserName(){
     console.log("First: "+this.user.fName);
   }

  ngOnInit(): void {
  }

  getItemById(id: number){
    this.foodService.genUrl(this.user);
    this.foodService.getItemById(id).subscribe(
      res => {
        this.foodItem = res;
        this.update();
      },
      err => console.log(err)
    );
  }


  update(){
    this.dateString = this.datepipe.transform(this.foodItem.DOL, 'dd/MM/yyyy');
    if (this.foodItem.isActive)
      this.inStock = 'true';
    else
      this.inStock = 'false';
  }

  saveChanges(form: NgForm): void{
    alert('Form submitted Successfully');
    this.foodItem.DOL = new Date(this.reverse(this.dateString));
    this.foodItem.isActive = this.inStock == 'true' ? true : false;
    this.editItem(this.foodItem);
  }

  reverse(str: string): string{
    return str.split('/').reverse().join('-');
  }

  editItem(item: MenuItem) {
    this.foodService.genUrl(this.user);
    this.foodService.editItem(item).subscribe(
      response => this.route.navigateByUrl('/menu-item-list'),
      error => console.error(error)
    );
  }


}
