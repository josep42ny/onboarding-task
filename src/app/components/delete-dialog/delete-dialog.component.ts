import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

  private readonly dialogRef = inject(MatDialogRef);

  protected confirm(): void {
    this.dialogRef.close(true);
  }

  protected dismiss(): void {
    this.dialogRef.close(false);
  }

}
