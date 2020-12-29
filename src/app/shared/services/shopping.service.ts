import {Injectable} from '@angular/core';
import {IngredientModel} from "../ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  ingredientsChanges = new Subject<IngredientModel[]>();
  startedEditing = new Subject<number>();

  constructor() { }

  public getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientById(id: number) {
    return this.ingredients[id];
  }

  addIngredient(newIngredient: IngredientModel) {
    this.ingredients.push(newIngredient);
    this.ingredientsChanges.next();
  }

  addMultipleIngredient(ingredients: IngredientModel[]) {
    //ingredients.forEach(elem => this.ingredients.push(elem));
    this.ingredients.push(...ingredients)
    this.ingredientsChanges.next();
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanges.next(this.ingredients.slice());
  }

  updateIngredient(id: number, newIngredient: IngredientModel) {
    this.ingredients[id] = newIngredient;
    this.ingredientsChanges.next(this.getIngredients());
  }
}
