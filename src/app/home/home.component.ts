import { Component, inject } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../interfaces/hero';
import { catchError, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
