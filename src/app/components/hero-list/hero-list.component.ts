import { Component, DestroyRef, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from '../../services/heroes.service';
import { catchError, retry, throwError } from 'rxjs';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';

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
    ReactiveFormsModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit {

  public heroes: WritableSignal<Hero[]> = signal([]);
  private readonly httpService = inject(HeroesService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly infoBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  public searchForm: FormGroup = this.formBuilder.group({ search: [''] });

  ngOnInit(): void {
    this.getHeroes();
  }

  public onSearchSubmit(): void {
    const searchValue = this.searchForm.value.search;
    this.getHeroes(searchValue);
  }

  public getHeroes(searchByName: string = ''): void {
    this.httpService.getHeroes(searchByName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        retry(2),
        catchError(error => {
          console.error('Unable to deliver after retries:', error);
          return throwError(() => new Error('We could not handle your request'))
        })
      )
      .subscribe((data: Hero[]) => {
        this.heroes.set(data);
      });
  }


  public open({ }): void;
  public open(opts: { hero: Hero }): void {
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

        if (isAdding) {
          this.httpService.addHero(hero)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.getHeroes());
        } else {
          this.httpService.updateHero(hero)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.getHeroes());
        }
      });
  }

  public openAddDialog(): void {
    this.open({});
  };

  public openEditDialog(hero: Hero): void {
    this.open({ hero: hero });
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
