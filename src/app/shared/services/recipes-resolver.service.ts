import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../../Recipe Book/recipes/recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "./data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const localRecipes = this.recipeService.getRecipes();
    if (localRecipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    }
  }
}
