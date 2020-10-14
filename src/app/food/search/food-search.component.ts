import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css']
})
export class FoodSearchComponent implements OnInit{

  @Output() searching: EventEmitter<string> = new EventEmitter<string>();
  searchText: string;

  constructor() {
   }

  ngOnInit(): void {
  }

  onSearch(): void{
    this.searching.emit(this.searchText);
  }

}
