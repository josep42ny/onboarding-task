import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InsertDialogComponent } from '../insert-dialog/insert-dialog.component';
import { Hero } from '../../interfaces/hero';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-update-dialog',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.scss'
})
export class UpdateDialogComponent {

  constructor(public dialogRef: MatDialogRef<InsertDialogComponent>) { }
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  protected heroForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    powers: ['', Validators.required],
    imageUrl: ['', Validators.required],
  });

  protected submit(): void {
    const result: Hero = this.heroForm.value;
    this.dialogRef.close(result);
  }

}
