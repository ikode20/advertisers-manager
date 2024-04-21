import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'cvtr-new-advertiser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './new-advertiser.component.html',
  styleUrl: './new-advertiser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAdvertiserComponent {
  private readonly dialogRef = inject(MatDialogRef<NewAdvertiserComponent>);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  newAdvertiserForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    orgurl: ['', [Validators.required, Validators.maxLength(50)]],
    telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
    address: ['', [Validators.required, Validators.maxLength(50)]],
    city: ['', [Validators.required, Validators.maxLength(20)]],
    postcode: ['', [Validators.required, Validators.pattern(/^([A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2})$/)]],
  });

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.newAdvertiserForm.value);
  }
}
