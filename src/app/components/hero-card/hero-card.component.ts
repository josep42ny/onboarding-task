import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { AfterViewInit, Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroDeleteComponent } from '../hero-delete/hero-delete.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly heroesService = inject(HeroesService);
  heroInfo = input<Hero>();

  @Output() updateEvent: EventEmitter<void> = new EventEmitter<void>();

  openDeleteHeroForm(hero: Hero | undefined): void {

    if (hero === undefined) {
      return;
    }

    const dialogRef = this.matDialog.open(HeroDeleteComponent, {
      width: '30%',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.heroesService.deleteHero(hero.id).subscribe(data => {
          this.updateEvent.emit();
        });
      }
    });

  }

}
