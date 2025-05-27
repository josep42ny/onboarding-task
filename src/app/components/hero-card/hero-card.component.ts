import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Component, inject, input } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroDeleteComponent } from '../hero-delete/hero-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, HeroDeleteComponent],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  heroInfo = input<Hero>();
  private readonly matDialog = inject(MatDialog);

  openDeleteHeroForm(): void {
    this.matDialog.open(HeroDeleteComponent, {
      width: '30%',
      maxWidth: '100vw'
    });
  }
}
