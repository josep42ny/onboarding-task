import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../interfaces/hero';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-dialog.component.html',
  styleUrl: './add-edit-dialog.component.scss'
})
export class AddEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>) { }
  public hero = input<Hero>();
  private readonly formBuilder = inject(FormBuilder);
  private readonly urlRegex: RegExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  public form = this.formBuilder.nonNullable.group({
    id: [{ value: -1, disabled: true }, Validators.required],
    name: [{ value: '', disabled: true }, Validators.required],
    description: [{ value: '', disabled: true }, Validators.required],
    location: [{ value: '', disabled: true }, Validators.required],
    powers: [{ value: '', disabled: true }, Validators.required],
    imageUrl: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(this.urlRegex)]],
    terms: [{ value: false, disabled: true }, Validators.requiredTrue],
  });

  ngOnInit(): void {
    // if hero is null, then the form is inserting a new hero, not editing one
    const h: any = this.hero() ?? {
      name: '',
      description: '',
      location: '',
      powers: '',
      imageUrl: '',
    };
    this.form.setValue(h);
    this.form.enable();
  }

  protected submit(): void {
    const result: any = this.form.value;
    delete result.terms;
    this.dialogRef.close(result as Hero);
  }

}

