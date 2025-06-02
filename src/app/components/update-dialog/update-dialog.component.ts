import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-update-dialog',
  imports: [
    MatDialogModule,
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
export class UpdateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public selectedHero: Hero) { };
  private readonly dialogRef = inject(MatDialogRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly heroesService = inject(HeroesService);
  private urlRegex: RegExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

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
    this.heroesService.getHero(this.selectedHero.id)
      .subscribe(hero => {
        this.form.setValue({
          id: hero.id,
          name: hero.name,
          description: hero.description,
          location: hero.location,
          powers: hero.powers,
          imageUrl: hero.imageUrl,
          terms: false,
        });
        this.form.enable();
      });
  }

  protected submit(): void {
    const result: any = this.form.value;
    delete result.terms;
    this.dialogRef.close(result as Hero);
  }

}
