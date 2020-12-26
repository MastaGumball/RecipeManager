import {EventEmitter, Injectable} from '@angular/core';
import {IngredientModel} from "../ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  ingredientsChanges = new EventEmitter();

  constructor() { }

  public getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(newIngredient: IngredientModel) {
    this.ingredients.push(newIngredient);
    this.ingredientsChanges.emit();
  }

  addMultipleIngredient(ingredients: IngredientModel[]) {
    //ingredients.forEach(elem => this.ingredients.push(elem));
    this.ingredients.push(...ingredients)
    this.ingredientsChanges.emit();
  }
}
