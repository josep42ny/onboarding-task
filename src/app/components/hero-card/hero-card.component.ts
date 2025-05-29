import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Component, EventEmitter, inject, input, output, Output } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroesService } from '../../services/heroes.service';
import { MatChipsModule } from '@angular/material/chips';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, NgxSkeletonLoaderModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly matSnack = inject(MatSnackBar);
  private readonly heroesService = inject(HeroesService);
  public heroInfo = input<Hero>();
  public onCardChange = output<void>();

  public openEditHeroForm(hero: Hero | undefined): void {

    if (hero === undefined) {
      return;
    }

    const modDialogRef = this.matDialog.open(UpdateDialogComponent, {
      width: '30%',
      maxWidth: '100vw',
      data: { hero }
    });

    modDialogRef.afterClosed().subscribe(hero => {
      if (!hero) {
        return;
      }
      this.heroesService.updateHero(hero).subscribe(data => {
        this.onCardChange.emit();
        this.showMessage("Héroe modificado con éxito");
      });
    });

  }

  public openDeleteHeroForm(hero: Hero | undefined): void {

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
          this.onCardChange.emit();
          this.showMessage("Este héroe se ha eliminado");
        });
      }
    });

  }

  showMessage(
    message: string,
    vertical: MatSnackBarVerticalPosition = 'top'
  ): void {
    this.matSnack.open(message, "", {
      duration: 2000,
      verticalPosition: vertical,
      panelClass: ['success']
    });
  }

}
