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
  filteredRecipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
  showModal = false;
  showCreateModal = false;

  searchTerm: string = '';
  ingredientSearchTerm: string = '';

  constructor(
    private recipeService: RecipesService
  ) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    });
  }

  onSearch() {
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.ingredientSearchTerm === '' || recipe.ingredients.map(ingredient => ingredient.toLowerCase()).includes(this.ingredientSearchTerm.toLowerCase()))
    );
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipe?.id ?? -1).subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.showModal = false;
        this.onSearch();
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    });

  }



  onSelectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
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
        this.showCreateModal = false;
        this.onSearch();
      },
      error: (error) => {
        console.error('Fetch recipe error', error);
      }
    });
  }

  onCancelSearch() {
    this.searchTerm = '';
    this.ingredientSearchTerm = '';
    this.onSearch();
  }
}
