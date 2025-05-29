import { Component, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from '../../services/heroes.service';
import { catchError, delay, retry, Subject, takeUntil, throwError } from 'rxjs';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { InsertDialogComponent } from '../insert-dialog/insert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoadingService } from '../../services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hero-list',
  imports: [
    HeroCardComponent,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit, OnDestroy {

  private destroyed: Subject<void> = new Subject<void>;
  public heroes: WritableSignal<Hero[]> = signal([]);
  public loading: WritableSignal<boolean> = signal(false);
  private readonly heroesService = inject(HeroesService);
  private readonly loadingService = inject(LoadingService);
  private readonly matDialog = inject(MatDialog);
  private readonly matSnack = inject(MatSnackBar);

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.getHeroes();
    this.listenToLoading();
  }

  public getHeroes(): void {
    this.heroesService.getHeroes()
      .pipe(
        retry(2),
        catchError(error => {
          console.error('Unable to deliver after retries:', error);
          return throwError(() => new Error('We could not handle your request'))
        }),
        takeUntil(this.destroyed)
      )
      .subscribe((data: Hero[]) => {
        this.heroes.set(data);
      });
  }

  private listenToLoading(): void {
    this.loadingService.getLoadingSubject()
      .pipe(delay(0))
      .subscribe(load =>
        this.loading.set(load)
      );
  }

  public openAddHeroForm(): void {
    const insertDialogRef = this.matDialog.open(InsertDialogComponent, {
      width: '40%',
      maxWidth: '100vw'
    });

    insertDialogRef.afterClosed()
      .subscribe(hero => {
        if (this.isHero(hero)) {
          this.addHero(hero);
        }
      });
  }

  private isHero(value: Hero): value is Hero {
    if (value.name) {
      return true;
    } else {
      return false;
    }
  }

  private addHero(hero: Hero): void {
    this.heroesService.addHero(hero)
      .subscribe(_ => {
        this.getHeroes();
        this.showMessage("Héroe creado con éxito");
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
