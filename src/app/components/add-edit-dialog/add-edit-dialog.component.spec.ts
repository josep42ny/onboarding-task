import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDialogComponent } from './add-edit-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { DialogRef } from '@angular/cdk/dialog';

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
  let dialogRef: MatDialogRef<AddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: { close: (res: any) => { } } },
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: MOCK_HERO },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('enables form after component initialization', () => {
    expect(component['form'].enabled).toBe(true);
  });

  it('shoud close popup  when editing', () => {
    const closeSpy = jest.spyOn(dialogRef, 'close');
    component['submit']();
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalledWith(MOCK_HERO);
  });
  // @TODO
  it('shoud close popup', () => {
    const closeSpy = jest.spyOn(dialogRef, 'close');
    component['isEditing']
    component['submit']();
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalledWith(MOCK_HERO);
  });
});
