import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDialogComponent } from './add-edit-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Hero } from '../../interfaces/hero';

const MOCK_HERO: Hero = {
  id: 420,
  name: '',
  powers: '',
  description: '',
  location: '',
  imageUrl: '',
}

describe('AddEditDialogComponent', () => {
  let component: AddEditDialogComponent;
  let fixture: ComponentFixture<AddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: MOCK_HERO }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
