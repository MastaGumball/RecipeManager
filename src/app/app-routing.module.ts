import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from "./Recipe Book/recipes/recipes.component";
import {RecipeDetailComponent} from "./Recipe Book/recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./Recipe Book/recipes/recipe-edit/recipe-edit.component";
import {ShoppingListComponent} from "./Shopping List/shopping-list/shopping-list.component";
import {SelectRecipeComponent} from "./Recipe Book/recipes/select-recipe/select-recipe.component";
import {RecipesResolverService} from "./shared/services/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";


const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: SelectRecipeComponent},
      {path: 'new', component: RecipeEditComponent},
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]}
    ],
    resolve: [RecipesResolverService]
  },
  {path: 'shopping', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
