import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private apiServerUrl: String = environment.apiBaseUrl;
  private http: HttpClient = inject(HttpClient);

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiServerUrl}/hero`);
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiServerUrl}/hero`, hero);
  }

  public updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiServerUrl}/hero`, hero);
  }

  public deleteHero(heroId: number): Observable<void> {
    console.log(`${this.apiServerUrl}/hero/${heroId}`);
    return this.http.delete<void>(`${this.apiServerUrl}/hero/${heroId}`);
  }

}
