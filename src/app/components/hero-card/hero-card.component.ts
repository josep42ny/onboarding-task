import type { Hero } from '../../interfaces/hero';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Component, input, output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-hero-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  public heroInfo = input.required<Hero>();
  public onDelete = output<number>();
  public onEdit = output<Hero>();

  protected openEditHeroForm() {
    this.onEdit.emit(this.heroInfo());
  }

  protected openDeleteHeroForm() {
    this.onDelete.emit(this.heroInfo().id);
  }

}
