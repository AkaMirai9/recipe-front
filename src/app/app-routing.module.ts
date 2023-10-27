import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recipe', component: RecipesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
