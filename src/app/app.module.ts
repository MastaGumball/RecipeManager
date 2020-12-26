import {BrowserModule} from '@angular/platform-browser';
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
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
