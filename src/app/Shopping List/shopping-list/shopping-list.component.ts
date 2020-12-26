import {Component, OnInit} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingService} from "../../shared/services/shopping.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: IngredientModel[] = [];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.getIngredients();
    this.shoppingService.ingredientsChanges.subscribe(() => this.getIngredients());
  }

  getIngredients() {
    this.ingredients = this.shoppingService.getIngredients();
  }

}
