import type { Hero } from '../../interfaces/hero';
import type { OnInit } from '@angular/core';
import { Component, computed, inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-edit-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-edit-dialog.component.html',
  styleUrl: './add-edit-dialog.component.scss'
})
export class AddEditDialogComponent implements OnInit {

  private readonly urlRegex: RegExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  private readonly dialogRef = inject(MatDialogRef<AddEditDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly data = inject<Hero>(MAT_DIALOG_DATA);
  protected readonly isEditing = computed<boolean>(() => !(this.data === undefined));

  protected form: FormGroup = this.formBuilder.nonNullable.group({
    id: [{ value: -1, disabled: true }, Validators.required],
    name: [{ value: '', disabled: true }, Validators.required],
    description: [{ value: '', disabled: true }, Validators.required],
    location: [{ value: '', disabled: true }, Validators.required],
    powers: [{ value: '', disabled: true }, Validators.required],
    imageUrl: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(this.urlRegex)]],
    terms: [{ value: false, disabled: true }, Validators.requiredTrue],
  });

  ngOnInit(): void {
    if (this.isEditing()) {
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        description: this.data.description,
        location: this.data.location,
        powers: this.data.powers,
        imageUrl: this.data.imageUrl,
        terms: false,
      });
    }

    this.form.enable();
  }

  protected submit(): void {
    const result: any = this.form.value;
    if (!this.isEditing()) {
      delete result.id;
    }
    delete result.terms;
    this.dialogRef.close(result as Hero);
  }

}

