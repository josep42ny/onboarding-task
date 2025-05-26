import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from '../../services/heroes.service';
import { catchError, retry, Subject, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  imports: [],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit, OnDestroy {
  private destroyed: Subject<void> = new Subject<void>;
  private heroes: Hero[] = [];
  private readonly heroesService = inject(HeroesService);

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
        this.heroes = data;
      });
  }
}
