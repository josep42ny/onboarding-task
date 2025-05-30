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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-list',
  imports: [
    HeroCardComponent,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit, OnDestroy {

  private destroyed: Subject<void> = new Subject<void>;
  public heroes: WritableSignal<Hero[]> = signal([]);
  private readonly heroesService = inject(HeroesService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly matDialog = inject(MatDialog);
  private readonly matSnack = inject(MatSnackBar);
  public searchForm: FormGroup = this.formBuilder.group({ search: [''] });

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  public onSearchSubmit(): void {
    const searchValue = this.searchForm.value.search;
    this.getHeroes(searchValue);
  }

  public getHeroes(searchByName: string = ''): void {
    this.heroesService.getHeroes(searchByName)
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

  public openAddHeroForm(): void {
    const insertDialogRef = this.matDialog.open(InsertDialogComponent, {
      width: 'calc(100% - 2rem)',
      maxWidth: '750px'
    });

    insertDialogRef.afterClosed()
      .subscribe(hero => {
        if (this.isValidHero(hero)) {
          this.addHero(hero);
        } else {
          this.showError('Héroe no valido');
        }
      });
  }

  private isValidHero(value: Hero): value is Hero {
    return !!value.name;
  }

  private addHero(hero: Hero): void {
    this.heroesService.addHero(hero)
      .subscribe(_ => {
        this.getHeroes();
        this.showMessage("Héroe creado con éxito");
      });
  }

  private showMessage(
    message: string,
    isError: boolean = false,
    vertical: MatSnackBarVerticalPosition = 'top'
  ): void {
    this.matSnack.open(message, "", {
      duration: 2000,
      verticalPosition: vertical,
      panelClass: [isError ? 'fail' : 'success']
    });
  }

  private showError(message: string): void {
    this.showMessage(message, true);
  }

}
