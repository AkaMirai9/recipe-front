import Recipe from "./recipe";

export interface RecipeHttpResponse {
  status: number;
  message: string;
  data: Recipe
}

export interface RecipesHttpResponse {
  status: number;
  message: string;
  data: Recipe[]
}
