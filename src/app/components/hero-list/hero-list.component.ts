import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from '../../services/heroes.service';
import { catchError, retry, Subject, takeUntil, throwError } from 'rxjs';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { HeroAddEditComponent } from '../hero-add-edit/hero-add-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-list',
  imports: [HeroCardComponent, MatGridListModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit, OnDestroy {

  private destroyed: Subject<void> = new Subject<void>;
  public heroes: WritableSignal<Hero[]> = signal([]);
  private readonly heroesService = inject(HeroesService);
  private readonly matDialog = inject(MatDialog);

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.getHeroes();
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

  openAddEditHeroForm(): void {
    const dialogRef = this.matDialog.open(HeroAddEditComponent, {
      width: '60%',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(hero => {
      this.heroesService.addHero(hero)
        .subscribe(result => {
          console.log(result)
        });
    });
  }

}
