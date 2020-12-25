import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Beef Stroganof', 'this is a test', 'https://sifu.unileversolutions.com/image/fr-BE/recipe-topvisual/2/1260-709/buf-stroganoff-a-la-vodka-50383541.jpg'),
    new Recipe('Mac and cheese', 'this is another test', 'https://cdn.pratico-pratiques.com/app/uploads/sites/4/2019/04/10100532/mac-n-cheese-au-bacon-et-fromage-en-grains.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
