import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: 'app-hero-add-edit',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './hero-add-edit.component.html',
  styleUrl: './hero-add-edit.component.scss'
})
export class HeroAddEditComponent {

  constructor(public dialogRef: MatDialogRef<HeroAddEditComponent>) { }
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  protected heroForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    habilities: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
  });

  protected submit(): void {
    const result: Object = this.heroForm.value;
    console.log(result);
    this.dialogRef.close(result);
  }

}
