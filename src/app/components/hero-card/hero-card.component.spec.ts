import type { Hero } from '../../interfaces/hero';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { Component, ViewChild } from '@angular/core';

const TEST_ID: number = 420;

@Component({
  template:
    `
    <app-hero-card (onDelete)="openDeleteDialog($event)" (onEdit)="openEditDialog($event)"
    [heroInfo]="sampleHero" />
  `
})
class HostCompoent {

  @ViewChild(HeroCardComponent) heroCardComponent!: HeroCardComponent;
  public sampleHero: Hero = {
    id: TEST_ID,
    name: '',
    powers: '',
    description: '',
    location: '',
    imageUrl: '',
  }
  public emittedId: number = 0;
  public emittedHero: Object = {};

  openEditDialog(hero: Hero) {
    this.emittedHero = hero;
  }

  openDeleteDialog(id: number) {
    this.emittedId = id;
  }

}

describe('HeroCardComponent', () => {
  let hostComponent: HostCompoent;
  let hostFixture: ComponentFixture<HostCompoent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent, HostCompoent],
    })
      .compileComponents();

    hostFixture = TestBed.createComponent(HostCompoent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('creates', () => {
    expect(hostComponent.heroCardComponent).toBeTruthy();
  });

  it('outputs id when clicking delete', () => {
    hostComponent.heroCardComponent.openEditHeroForm();
    expect(hostComponent.emittedId).toBe(TEST_ID);
  });

});
