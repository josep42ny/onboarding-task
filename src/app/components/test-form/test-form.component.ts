import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, input, InputSignal, OnChanges, signal, SimpleChanges } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validator, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
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

export interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  validators: JsonFormValidators;
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

  public readonly data = input.required<JsonFormControls[]>();
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup = this.formBuilder.group({});
  protected notFirstPass = signal<boolean>(false);
  // public test = computed(() => {
  //   if (!this.firstPass) {
  //     console.log('data', this.data());
  //     this.createForm(this.data());
  //   }
  //   this.firstPass = false;
  // });

  constructor() {
    effect(() => {
      if (this.notFirstPass()) {
        console.log('data', this.data());
        this.createForm(this.data());
      }
      this.notFirstPass.set(true);
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

      console.log(control.name);
      this.form.addControl(control.name, this.formBuilder.control(control.value, validators));
    }
  }

  protected onSubmit(): void {

  }

}
