import { Component } from '@angular/core';
import {RecipesService} from "../recipes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private recipesService: RecipesService,
              private router: Router) {}

  onLogin() {
    this.recipesService.login(this.username, this.password).subscribe(
      (response) => {
        this.router.navigate(['/recipe']);
      },
      (error) => {
        console.error('Erreur de connexion :', error);
      }
    );
  }
}
