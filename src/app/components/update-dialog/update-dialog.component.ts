import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InsertDialogComponent } from '../insert-dialog/insert-dialog.component';
import { Hero } from '../../interfaces/hero';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeroesService } from '../../services/heroes.service';

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
export class UpdateDialogComponent implements OnInit {

  //constructor(public dialogRef: MatDialogRef<InsertDialogComponent>) { }
  @Inject(MAT_DIALOG_DATA) public selectedHero: any;
  private readonly dialogRef: MatDialogRef<InsertDialogComponent> = inject(MatDialogRef);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly heroesService: HeroesService = inject(HeroesService);
  protected form: FormGroup | any;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    console.log(this.selectedHero);
    this.heroesService.getHero(this.selectedHero.id).subscribe(hero => {
      this.form = this.formBuilder.group(hero);
    });
  }

  protected submit(): void {
    const result: Hero = this.form.value;
    console.log(result);
    //this.dialogRef.close(result);
  }

}
