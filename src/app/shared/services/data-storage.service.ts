import {Injectable} from '@angular/core';
import {RecipeService} from "./recipe.service";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../../Recipe Book/recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put('https://ng-complete-guide-32921-default-rtdb.europe-west1.firebasedatabase.app/recipe.json', recipes)
      .subscribe(response => console.log(response));
  }

  public fetchRecipes() {

    return this.httpClient.get<Recipe[]>('https://ng-complete-guide-32921-default-rtdb.europe-west1.firebasedatabase.app/recipe.json')
      .pipe(
        map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }



}
