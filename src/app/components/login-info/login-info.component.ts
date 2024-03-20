import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Step } from '../register-form-container/register-form-container.component';
import { CommonModule } from '@angular/common';
import { CardModule, FormModule, GridModule } from '@coreui/angular';

@Component({
  selector: 'app-login-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule, GridModule, FormModule,],
  templateUrl: './login-info.component.html',
  styleUrl: './login-info.component.scss'
})
export class LoginInfoComponent implements OnInit {
  @Input()
  startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'forward' | 'back'> = new EventEmitter<'forward' | 'back'>()
  public loginInfoForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    if (this.startingForm){
      this.loginInfoForm = this._fb.group(this.startingForm)

      this.loginInfoForm.get('email')!.setValidators([Validators.required, Validators.email]);
      this.loginInfoForm.get('password')!.setValidators([Validators.required]);

      // Update validity after adding validators
      this.loginInfoForm.get('email')!.updateValueAndValidity();
      this.loginInfoForm.get('password')!.updateValueAndValidity();

    } else {
      this.loginInfoForm = this._fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      })
    }
    this.subformInitialized.emit(this.loginInfoForm);
  }

  doChangeStep(direction: 'forward') {
    this.changeStep.emit(direction);
  }
}