import { Component, input } from '@angular/core';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-card',
  imports: [],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  hero: Hero = input();
}
