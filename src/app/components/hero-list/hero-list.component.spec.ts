import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListComponent } from './hero-list.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
