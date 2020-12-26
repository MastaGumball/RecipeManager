import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../../Recipe Book/recipes/recipe.model";
import {IngredientModel} from "../ingredient.model";
import {ShoppingService} from "./shopping.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Beef Stroganof', 'this is a test', 'https://sifu.unileversolutions.com/image/fr-BE/recipe-topvisual/2/1260-709/buf-stroganoff-a-la-vodka-50383541.jpg', [
      new IngredientModel('beef', 1), new IngredientModel('pasta', 0.5)
    ]),
    new Recipe('Mac and cheese', 'this is another test', 'https://cdn.pratico-pratiques.com/app/uploads/sites/4/2019/04/10100532/mac-n-cheese-au-bacon-et-fromage-en-grains.jpg',[
      new IngredientModel('beef', 1), new IngredientModel('pasta', 0.5)
    ])
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingService: ShoppingService) { }

  getRecipes() {
    return this.recipes.slice();
  }

/*  selectRecipe(recipe: Recipe) {
    console.log(recipe);
    this.recipeSelected.emit(recipe);
  }*/

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingService.addMultipleIngredient(ingredients);
  }


}
