import { DestroyRef, inject, Injectable, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AddEditDialogComponent } from '../components/add-edit-dialog/add-edit-dialog.component';
import { Hero } from '../interfaces/hero';
import { HeroesService } from './heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestwomboService {

  private readonly dialog = inject(MatDialog);
  private readonly infoBar = inject(MatSnackBar);
  private readonly httpService = inject(HeroesService);
  private readonly destroyRef = inject(DestroyRef);

  public open({ }): void;
  public open(opts: { hero: Hero }): Observable<boolean> {
    const out: Observable<boolean> = new Observable<boolean>;
    const isAdding: boolean = (opts.hero === undefined);

    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: 'calc(100% - 2rem)',
      maxWidth: '750px',
      data: opts.hero,
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(hero => {

        if (hero === undefined) {
          return;
        }

        isAdding ? this.httpService.addHero(hero) : this.httpService.updateHero(hero);
      });
    return out;
  }

  public openAdd(): void {
    this.open({});
  };

}
