import { Component } from '@angular/core';
import { HeroListComponent } from '../components/hero-list/hero-list.component';

@Component({
  selector: 'app-home',
  imports: [HeroListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
