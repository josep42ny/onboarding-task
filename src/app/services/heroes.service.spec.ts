import type { Hero } from '../interfaces/hero';
import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HttpErrorResponse, HttpEventType, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';

const EXPECTED_HERO = {
  "id": 0,
  "name": "Captain Blaze",
  "description": "A fearless hero who commands the power of fire and heat.",
  "location": "Volcanic Ridge",
  "powers": "Pyrokinesis",
  "imageUrl": "https://picsum.photos/seed/1/400/300"
};
const EXPECTED_HEROES = [EXPECTED_HERO];
const URL = environment.apiBaseUrl + '/hero?name_like=';

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

  it('gets heroes', () => {
    service.getHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes).toEqual(EXPECTED_HEROES);
    });

    const request = httpTesting.expectOne(URL);
    request.flush(EXPECTED_HEROES);
  });

  it('fails to get heroes', () => {
    const request = httpTesting.expectOne(URL);
    request.error(new ProgressEvent('Internal Server Error'), { status: 500 });
  });

});
