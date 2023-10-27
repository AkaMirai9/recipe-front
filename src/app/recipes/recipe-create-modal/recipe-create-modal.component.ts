import {Component, EventEmitter, Output} from '@angular/core';
import Recipe from "../../recipe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipe-create-modal',
  templateUrl: './recipe-create-modal.component.html',
  styleUrls: ['./recipe-create-modal.component.css']
})
export class RecipeCreateModalComponent {
  @Output() createRecipe = new EventEmitter<Partial<Recipe>>();
  @Output() closeModal = new EventEmitter<void>();

  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe: Partial<Recipe> = {
        name: this.recipeForm.get('name')?.value,
        description: this.recipeForm.get('description')?.value,
        ingredients: this.recipeForm.get('ingredients')?.value.split('\n'),
        instructions: this.recipeForm.get('instructions')?.value,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.createRecipe.emit(newRecipe);
      this.recipeForm.reset();
    }
  }
}
