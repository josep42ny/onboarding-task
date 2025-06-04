import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, input, InputSignal, OnChanges, SimpleChanges } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validator, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-test-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
})
export class TestFormComponent {

  public data = input<JsonFormData>();
  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public form: FormGroup = this.formBuilder.group({});

  constructor() {
    effect(() => {
      this.createForm([{
        "name": "name",
        "label": "Nombre",
        "value": "",
        "type": "text",
        "validators": {
          "required": true
        }
      }]);
    });
  }

  private createForm(controls: JsonFormControls[]): void {
    for (const control of controls) {
      let validators: ValidatorFn[] = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'required':
            validators.push(Validators.required);
            break;

          default:
            break;
        }
      }

      this.form.addControl(control.name, this.formBuilder.control(control.value, validators));
    }
  }

  protected onSubmit(): void {

  }

}
