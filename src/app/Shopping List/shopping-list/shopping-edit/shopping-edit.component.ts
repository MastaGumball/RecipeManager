import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from "../../../shared/ingredient.model";
import {ShoppingService} from "../../../shared/services/shopping.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: true})
  shoppingListForm: NgForm;

  startedEditingSubscription: Subscription;

  editMode = false;
  editedItemIndex: number;

  editedIngredient: IngredientModel;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.startedEditingSubscription = this.shoppingService.startedEditing.subscribe(id => {
      this.editMode = true;
      this.editedItemIndex = id;
      this.editedIngredient = this.shoppingService.getIngredientById(id);
      this.shoppingListForm.form.patchValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const newIngredientName = form.value.name;
    const newIngredientAmount = form.value.amount;
    const newIngredient = new IngredientModel(newIngredientName, newIngredientAmount);
    if (this.editMode === true) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }

}
