import {Injectable} from '@angular/core';
import {Recipe} from "../../Recipe Book/recipes/recipe.model";
import {IngredientModel} from "../ingredient.model";
import {ShoppingService} from "./shopping.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingService: ShoppingService,
              private router: Router) { }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipeById(id: number) {
    return this.recipes.slice()[id];
  }


  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingService.addMultipleIngredient(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
    this.router.navigate(['/recipes/'+ (this.recipes.length-1).toString()]);


  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
    this.router.navigate(['/recipes/'+ index.toString()]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
    this.router.navigate(['/recipes']);
  }

}
