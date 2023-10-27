import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { RecipeModalComponent } from './recipes/recipe-modal/recipe-modal.component';
import { RecipeCreateModalComponent } from './recipes/recipe-create-modal/recipe-create-modal.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeCardComponent,
    RecipeModalComponent,
    RecipeCreateModalComponent
  ],
  imports: [
    MatSnackBarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
