import type { Hero } from '../interfaces/hero';
import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HttpErrorResponse, HttpEventType, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';
import { config, firstValueFrom, Observable } from 'rxjs';

interface HeroesParams<T> {
  params: Array<any>,
  url: string,
  method: string,
}

const MOCK_HERO: Hero = {
  "id": 420,
  "name": "Captain Blaze",
  "description": "A fearless hero who commands the power of fire and smoke.",
  "location": "Volcanic Ridge",
  "powers": "Pyrokinesis",
  "imageUrl": "https://picsum.photos/seed/420/400/300"
};
const MOCK_HEROES = [MOCK_HERO, MOCK_HERO];
const HERO_REQ_ID = 0;
const GET_HERO_REQ = `${environment.apiBaseUrl}/hero/${HERO_REQ_ID}`;
const GET_HEROES_REQ = `${environment.apiBaseUrl}/hero?name_like=`;
const ADD_HERO_REQ = `${environment.apiBaseUrl}/hero`;
const UPDATE_HERO_REQ = `${environment.apiBaseUrl}/hero/${MOCK_HERO.id}`;
const DELETE_HERO_REQ = `${environment.apiBaseUrl}/hero/${MOCK_HERO.id}`;

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroesService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('creates', () => {
    expect(service).toBeTruthy();
  });

  it('gets a single hero', () => {
    const heores: Observable<Hero> = service.getHero(HERO_REQ_ID);
    const heroPromise: Promise<Hero> = firstValueFrom(heores);

    //capture the request
    const req: TestRequest = httpTesting.expectOne({
      method: 'GET',
      url: GET_HERO_REQ,
    }, 'Request to load hero');
    req.flush(MOCK_HERO); //mock the response

    heroPromise.then((hero: Hero) => {
      expect(hero).toEqual(MOCK_HERO);
    });
  });

  it('gets multiple heroes', () => {
    const heores: Observable<Hero[]> = service.getHeroes();
    const heroPromise: Promise<Hero[]> = firstValueFrom(heores);

    //capture the request
    const req: TestRequest = httpTesting.expectOne({
      method: 'GET',
      url: GET_HEROES_REQ,
    }, 'Request to load heroes');
    req.flush(MOCK_HEROES); //mock the response

    heroPromise.then((hero: Hero[]) => {
      expect(hero).toEqual(MOCK_HEROES);
    });
  });

  it('adds a hero', () => {
    const heroes: Observable<Hero> = service.addHero(MOCK_HERO);
    const heroPromise: Promise<Hero> = firstValueFrom(heroes);

    //capture the request
    const req: TestRequest = httpTesting.expectOne({
      method: 'POST',
      url: ADD_HERO_REQ,
    }, 'Request to load heroes');
    req.flush(MOCK_HERO); //mock the response

    heroPromise.then((hero: Hero) => {
      expect(hero).toEqual(MOCK_HERO);
    });
  });

  it('updates a hero', () => {
    const heroes: Observable<Hero> = service.updateHero(MOCK_HERO);
    const heroPromise: Promise<Hero> = firstValueFrom(heroes);

    //capture the request
    const req: TestRequest = httpTesting.expectOne({
      method: 'PUT',
      url: UPDATE_HERO_REQ,
    }, 'Request to load heroes');
    req.flush(MOCK_HERO); //mock the response

    heroPromise.then((hero: Hero) => {
      expect(hero).toEqual(MOCK_HERO);
    });
  });

  it('deletes a hero', () => {
    const heroes: Observable<void> = service.deleteHero(MOCK_HERO.id);
    const heroPromise: Promise<void> = firstValueFrom(heroes);

    //capture the request
    const req: TestRequest = httpTesting.expectOne({
      method: 'DELETE',
      url: DELETE_HERO_REQ,
    }, 'Request to load heroes');
    req.flush(null); //mock the response

    heroPromise.then((response: void) => {
      expect(response).toBe(null);
    });
  });
});
