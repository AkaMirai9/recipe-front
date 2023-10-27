import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map, Observable, throwError} from "rxjs";
import Recipe from "./recipe";
import {RecipesHttpResponse, RecipeHttpResponse} from "./recipe-http-response";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private apiUrl : string;
  private baseUrl: string;
  private headers;
  private httpOptions;
  constructor(
    private http: HttpClient, private snackBar: MatSnackBar) {
    this.apiUrl = "http://localhost:8000";
    this.baseUrl = this.apiUrl + "/recipes";
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    });
    this.httpOptions = {
      headers: this.headers
    };
  }

  private handleInvalidRecipeFormatError(error: HttpErrorResponse) {
    this.snackBar.open('La recette envoyée n\'est pas dans le format attendu.', 'Fermer', {
      duration: 5000,
    });
    return throwError('La recette envoyée n\'est pas dans le format attendu.');
  }

  private handleRecipeNotFoundError(error: HttpErrorResponse) {
    this.snackBar.open('L\'id envoyé ne correspond à aucune recette.', 'Fermer', {
      duration: 5000,
    });
    return throwError('L\'id envoyé ne correspond à aucune recette.');
  }

  private handleInvalidIdFormatError(error: HttpErrorResponse) {
    this.snackBar.open('L\'id envoyé n\'est pas dans le format attendu.', 'Fermer', {
      duration: 5000,
    });
    return throwError('L\'id envoyé n\'est pas dans le format attendu.');
  }

  private handleError(error: HttpErrorResponse) {
    this.snackBar.open('Une erreur s\'est produite. Veuillez réessayer plus tard.', 'Fermer', {
      duration: 5000,
    });
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  private handleLoginError(error: HttpErrorResponse) {
    this.snackBar.open('Informations de connections éronnées.', 'Fermer', {
      duration: 5000,
    });
    return throwError('Informations de connections éronnées.');
  }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password }, httpOptions).pipe(
      map(response => {
        const jwtToken = response.token;
        localStorage.setItem('jwtToken', jwtToken);
        return response;
      }),
      catchError(error => {
        return this.handleError(error)
      }));
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipesHttpResponse>(`${this.baseUrl}`, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError((error) => {
          if (error.status === 401) {
            return this.handleLoginError(error);
          } else return this.handleError(error);
        })
      );
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<RecipeHttpResponse>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
      map(response => response.data),
        catchError((error) => {
          if (error.status === 400) {
            return this.handleInvalidIdFormatError(error)
          } else if (error.status === 404) {
            return this.handleRecipeNotFoundError(error)
          } else {
            return this.handleError(error);
          }
        })
    );
  }

  createRecipe(recipe: Partial<Recipe>): Observable<Recipe[]> {
    return this.http.post<RecipesHttpResponse>(`${this.baseUrl}`, recipe, this.httpOptions)
      .pipe(
      map(response => response.data),
        catchError((error) => {
          if (error.status === 400) {
            return this.handleInvalidRecipeFormatError(error)
          } else if (error.status === 404) {
            return this.handleRecipeNotFoundError(error)
          } else {
            return this.handleError(error);
          }
        })
    );
  }

  updateRecipe(id: number, recipe: Recipe): Observable<Recipe[]> {
    return this.http.put<RecipesHttpResponse>(`${this.baseUrl}/${id}`, recipe, this.httpOptions)
      .pipe(
      map(response => response.data),
        catchError((error) => {
          if (error.status === 400 && error.data.message === "la recette envoyée n'est pas dans le format attendu") {
            return this.handleInvalidRecipeFormatError(error)
          } else if (error.status === 400) {
            return this.handleInvalidIdFormatError(error)
          }else if (error.status === 404) {
            return this.handleRecipeNotFoundError(error)
          } else {
            return this.handleError(error);
          }
        })
    );
  }

  deleteRecipe(id: number): Observable<Recipe[]> {
    return this.http.delete<RecipesHttpResponse>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
      map(response => response.data),
        catchError((error) => {
          if (error.status === 400) {
            return this.handleInvalidIdFormatError(error)
          } else if (error.status === 404) {
            return this.handleRecipeNotFoundError(error)
          } else {
            return this.handleError(error);
          }
        })
    );
  }
}
