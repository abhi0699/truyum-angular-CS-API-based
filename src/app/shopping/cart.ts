import { isNgTemplate } from '@angular/compiler';
import { MenuItem } from '../food-item';


export class Cart {
    menuItemList: Array<MenuItem>;
    sum: number;

    constructor() {
        this.menuItemList = new Array<MenuItem>();
    }

    calculateTotal(): void {
        this.sum = 0;
        if (this.menuItemList.length != 0)
            this.menuItemList.forEach(item => this.sum += item.price);
    }
}