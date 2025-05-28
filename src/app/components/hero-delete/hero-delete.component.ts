import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hero-delete',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './hero-delete.component.html',
  styleUrl: './hero-delete.component.scss'
})
export class HeroDeleteComponent {

  constructor(public dialogRef: MatDialogRef<HeroDeleteComponent>) { }

  protected confirm(): void {
    this.dialogRef.close(true);
  }

  protected dismiss(): void {
    this.dialogRef.close(false);
  }

}
