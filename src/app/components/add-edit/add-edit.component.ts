import { Component, inject, input } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Hero } from '../../interfaces/hero';
import { MatDialog } from '@angular/material/dialog';
import { HeroesService } from '../../services/heroes.service';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-add-edit',
  imports: [],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {

  private readonly dialog = inject(MatDialog);
  private readonly infoBar = inject(MatSnackBar);
  private readonly httpService = inject(HeroesService);
  public hero = input<Hero>();

  public open(opts: {}): void;
  public open(opts: { hero: Hero }): void {
    const isAdding: boolean = (opts.hero === undefined);

    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: 'calc(100% - 2rem)',
      maxWidth: '750px',
      data: opts.hero,
    });


    dialogRef.afterClosed()
      .subscribe(hero => {

        if (isAdding) {
          this.httpService.addHero(hero).subscribe(result => {
            // getHeroes()
            this.showMessage("Héroe modificado con éxito");
          });
        } else {
          this.httpService.updateHero(hero).subscribe(result => {
            // getHeroes()
            this.showMessage("Héroe creado con éxito");
          });
        }

      });
  }

  public openAdd(): void {
    this.open({});
  };

  private showMessage(
    message: string,
    isError: boolean = false,
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ): void {
    this.infoBar.open(message, "", {
      duration: 2000,
      verticalPosition: verticalPosition,
      panelClass: [isError ? 'fail' : 'success']
    });
  }

  private showError(message: string): void {
    this.showMessage(message, true);
  }

}
