import type { Hero } from '../../interfaces/hero';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardComponent } from './hero-card.component';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with a hero object', () => {
    expect(component.heroInfo()).toBeTruthy();
  })

  it('input object should conform to hero interface', () => {
    const sampleHero: Hero = {
      id: 0,
      name: '',
      powers: '',
      description: '',
      location: '',
      imageUrl: '',
    }
    expect(component.heroInfo()).toBeInstanceOf<Hero>(sampleHero);
  })
});
