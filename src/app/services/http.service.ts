import type { Hero } from '../interfaces/hero';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { JsonFormControls } from '../components/test-form/test-form.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiServerUrl: String = environment.apiBaseUrl;
  private readonly http: HttpClient = inject(HttpClient);

  public getHeroes(searchByName: string = ''): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiServerUrl}/hero?name_like=${searchByName}`);
  }

  public getHero(heroId: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiServerUrl}/hero/${heroId}`);
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiServerUrl}/hero`, hero);
  }

  public updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiServerUrl}/hero/${hero.id}`, hero);
  }

  public deleteHero(heroId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/hero/${heroId}`);
  }

  public getFormData(): Observable<JsonFormControls[]> {
    console.log('http');
    return this.http.get<JsonFormControls[]>(`${this.apiServerUrl}/controls`);
  }

}
