import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroesService } from '../../services/heroes.service';
import { MatChipsModule } from '@angular/material/chips';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly heroesService = inject(HeroesService);
  heroInfo = input<Hero>();

  @Output() updateEvent: EventEmitter<void> = new EventEmitter<void>();

  openEditHeroForm(hero: Hero | undefined): void {

    if (hero === undefined) {
      return;
    }

    const delDialogRef = this.matDialog.open(UpdateDialogComponent, {
      width: '30%',
      maxWidth: '100vw'
    });

    delDialogRef.afterClosed().subscribe(hero => {
      this.heroesService.updateHero(hero).subscribe(data => {
        this.updateEvent.emit();
        // TODO: confirmation popup
      });
    });

  }

  openDeleteHeroForm(hero: Hero | undefined): void {

    if (hero === undefined) {
      return;
    }

    const delDialogRef = this.matDialog.open(DeleteDialogComponent, {
      width: '30%',
      maxWidth: '100vw'
    });

    delDialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.heroesService.deleteHero(hero.id).subscribe(data => {
          this.updateEvent.emit();
          // TODO: confirmation popup
        });
      }
    });

  }

}
