import {Component, OnInit} from '@angular/core';
import Recipe from "../recipe";
import {RecipesService} from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
  showModal = false;
  showCreateModal = false;
  constructor(
    private recipeService: RecipesService
  ) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipe?.id ?? -1).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    });
    this.showModal = false;
  }



  onSelectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
    console.log(recipe);
    this.showModal = true;
  }

  onRecipesUpdated(updatedRecipes: Recipe[]) {
    this.recipes = updatedRecipes
  }

  onCloseModal() {
    this.selectedRecipe = null;
    this.showModal = false;
  }

  onShowCreateModal() {
    this.showCreateModal = true;
  }

  onCloseCreateModal() {
    console.log('Modal closed')
    this.showCreateModal = false;
  }

  onCreateRecipe(recipe: Partial<Recipe>) {
    this.recipeService.createRecipe(recipe).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    });
    this.showCreateModal = false;
  }
}
