import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-insert-dialog',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './insert-dialog.component.html',
  styleUrl: './insert-dialog.component.scss'
})
export class InsertDialogComponent {

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
