import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule, GridModule, FormModule } from '@coreui/angular';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDto } from '../../interfaces/user';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-signin-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule, GridModule, FormModule,],
  templateUrl: './signin-card.component.html',
  styleUrl: './signin-card.component.scss'
})
export class SigninCardComponent implements OnInit {
  signinForm = this._fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  message: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private router: Router  
  ) {

    route.params.subscribe(params=>this.message=params["message"]);
    console.log(this.message)

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      params => this.message=params.get("message")
    );
    console.log(this.message)
  }

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
        this.storageService.saveUser(user);
        this.router.navigate(['/']);
      },
      error: error => {
        // Handle sign-in error
        console.error('Error signing in:', error);
        this.errorMessage = `Ошибка аутентификации`
      }
    });
  }


}
