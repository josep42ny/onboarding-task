import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Component, inject, input, output } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  public openEditHeroForm(): void {

    const modDialogRef: MatDialogRef<UpdateDialogComponent> = this.matDialog.open(UpdateDialogComponent, {
      width: 'calc(100% - 2rem)',
      maxWidth: '750px',
      data: this.heroInfo
    });

    modDialogRef.afterClosed().subscribe((hero: Hero) => {
      if (!hero) {
        return;
      }
      this.heroesService.updateHero(hero).subscribe(() => {
        this.onCardChange.emit();
        this.showMessage("Héroe modificado con éxito");
      });
    });

  }

  public openDeleteHeroForm(): void {

    const delDialogRef: MatDialogRef<DeleteDialogComponent> = this.matDialog.open(DeleteDialogComponent, {
      width: 'calc(100% - 2rem)',
      maxWidth: '500px'
    });

    delDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // todo check undefined id
        this.heroesService.deleteHero(this.heroInfo()?.id ?? -1).subscribe(() => {
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
