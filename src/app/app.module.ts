import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ShoppingListComponent} from './Shopping List/shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './Shopping List/shopping-list/shopping-edit/shopping-edit.component';
import {RecipeListComponent} from './Recipe Book/recipes/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './Recipe Book/recipes/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './Recipe Book/recipes/recipe-detail/recipe-detail.component';
import {HeaderComponent} from "./Header/header.component";
import {RecipesComponent} from './Recipe Book/recipes/recipes.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {RecipeEditComponent} from './Recipe Book/recipes/recipe-edit/recipe-edit.component';
import {SelectRecipeComponent} from './Recipe Book/recipes/select-recipe/select-recipe.component';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeEditComponent,
    SelectRecipeComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
