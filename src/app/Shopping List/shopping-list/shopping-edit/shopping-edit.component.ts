import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from "../../../shared/ingredient.model";
import {ShoppingService} from "../../../shared/services/shopping.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static : false})
  ingredientName: ElementRef;

  @ViewChild('amountInput', {static : false})
  ingredientAmount: ElementRef;


  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onAddClicked() {
    const newIngredientName = this.ingredientName.nativeElement.value;
    const newIngredientAmount = this.ingredientAmount.nativeElement.value;
    this.shoppingService.addIngredient(new IngredientModel(newIngredientName, newIngredientAmount));
  }
}
