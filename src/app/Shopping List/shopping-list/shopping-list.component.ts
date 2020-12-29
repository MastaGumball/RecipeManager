import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingService} from "../../shared/services/shopping.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IngredientModel[] = [];
  ingredientChangedSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.getIngredients();
    this.ingredientChangedSubscription = this.shoppingService.ingredientsChanges.subscribe(() => this.getIngredients());
  }

  getIngredients() {
    this.ingredients = this.shoppingService.getIngredients();
  }

  ngOnDestroy(): void {
    this.ingredientChangedSubscription.unsubscribe();
  }

  onEditItem(i: number) {
    this.shoppingService.startedEditing.next(i);
  }
}
