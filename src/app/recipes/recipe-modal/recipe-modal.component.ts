import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Recipe from "../../recipe";
import { RecipesService } from "../recipes.service";

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})

export class RecipeModalComponent implements OnInit {
  @Input() recipeId!: number;
  @Output() closeModal = new EventEmitter<void>();
  @Output() deleteRecipe = new EventEmitter<void>();
  @Output() updatedRecipes = new EventEmitter<Recipe[]>();
  recipe!: Recipe;

  rawRecipe!: Recipe;

  isContentEditable = false;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe: Recipe) => {
        this.recipe = recipe;
        this.rawRecipe = {...recipe};
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    });

  }

  addIngredient() {
    this.recipe.ingredients.push('');
  }

  deleteIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  updateIngredient(index: number, newIndredient: string) {
    this.recipe.ingredients[index] = newIndredient
  }

  toggleEdit() {
    this.isContentEditable = !this.isContentEditable;
  }

  saveChanges() {
    this.recipeService.updateRecipe(this.recipeId, this.recipe).subscribe({
      next: (recipes: Recipe[]) => {
        this.updatedRecipes.emit(recipes);
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    })
    this.toggleEdit();
  }

  cancelChanges() {
    this.recipe = {...this.rawRecipe}
    this.toggleEdit();
  }
}
