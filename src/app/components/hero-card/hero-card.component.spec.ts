import type { Hero } from '../../interfaces/hero';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { By } from '@angular/platform-browser';

const EXPECTED_ID: number = 420;
const EXPECTED_HERO: Hero = {
  id: EXPECTED_ID,
  name: '',
  powers: '',
  description: '',
  location: '',
  imageUrl: '',
}

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('heroInfo', EXPECTED_HERO);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('outputs id when clicking delete', () => {
    let recievedId: number | undefined;
    component.onDelete.subscribe((id: number) => {
      recievedId = id;
    });

    fixture.debugElement.query(By.css(`[data-testid="delButton"]`)).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(recievedId).toBe(EXPECTED_ID);
  });

  it('outputs hero when clicking edit', () => {
    let recievedHero: Hero | undefined;
    component.onEdit.subscribe((hero: Hero) => {
      recievedHero = hero;
    });

    fixture.debugElement.query(By.css(`[data-testid="editButton"]`)).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(recievedHero).toBe(EXPECTED_HERO);
  });

});
