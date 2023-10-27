import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map, Observable} from "rxjs";
import Recipe from "../recipe";
import {RecipesHttpResponse, RecipeHttpResponse} from "./recipe-http-response";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private apiUrl : string;
  private baseUrl: string
  constructor(
    private http: HttpClient) {
    this.apiUrl = "http://localhost:8000";
    this.baseUrl = this.apiUrl + "/recipes"
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipesHttpResponse>(`${this.baseUrl}`)
      .pipe(
        map(response => response.data)
      );
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<RecipeHttpResponse>(`${this.baseUrl}/${id}`)
      .pipe(
      map(response => response.data)
    );
  }

  createRecipe(recipe: Partial<Recipe>): Observable<Recipe[]> {
    return this.http.post<RecipesHttpResponse>(`${this.baseUrl}`, recipe)
      .pipe(
      map(response => response.data)
    );
  }

  updateRecipe(id: number, recipe: Recipe): Observable<Recipe[]> {
    return this.http.put<RecipesHttpResponse>(`${this.baseUrl}/${id}`, recipe)
      .pipe(
      map(response => response.data)
    );
  }

  deleteRecipe(id: number): Observable<Recipe[]> {
    return this.http.delete<RecipesHttpResponse>(`${this.baseUrl}/${id}`)
      .pipe(
      map(response => response.data)
    );
  }
}
