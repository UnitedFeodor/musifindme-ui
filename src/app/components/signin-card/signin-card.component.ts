import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule, GridModule, FormModule } from '@coreui/angular';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDto } from '../../interfaces/user';

@Component({
  selector: 'app-signin-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule, GridModule, FormModule,],
  templateUrl: './signin-card.component.html',
  styleUrl: './signin-card.component.scss'
})
export class SigninCardComponent {
  signinForm = this._fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService
  ) {}

  loginUser() {
    const email = this.signinForm.get('email')?.value || ''; // TODO i don't know may be errors here
    const password = this.signinForm.get('password')?.value || '';
  
    const loginRequest: LoginRequestDto = {
      email,
      password
    };
    this.authService.signInUser(loginRequest).subscribe( {
      next: user => {
        // Handle successful sign-in
        console.log('Tried to sign in', user);
        
      },
      error: error => {
        // Handle sign-in error
        console.error('Error signing in:', error);
      }
    });
  }


}
