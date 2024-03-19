import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonalInfoComponent } from "../personal-info/personal-info.component";
import { LoginInfoComponent } from "../login-info/login-info.component";
import { CommonModule } from '@angular/common';
import { SearchInfoComponent } from "../search-info/search-info.component";
import { MusicFavoritesInfoComponent } from "../music-favorites-info/music-favorites-info.component";

export type Step = 'personalInfo' | 'loginInfo' | 'searchInfo' | 'musicFavoritesInfo';
@Component({
    selector: 'app-register-form-container',
    standalone: true,
    templateUrl: './register-form-container.component.html',
    styleUrl: './register-form-container.component.scss',
    imports: [PersonalInfoComponent, LoginInfoComponent, CommonModule, ReactiveFormsModule, SearchInfoComponent, MusicFavoritesInfoComponent]
})
export class RegisterFormContainerComponent implements OnInit {

  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('loginInfo');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();
  public userForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}
  ngOnInit() {
    this.userForm = this._fb.group({
      personalInfo: null,
      loginInfo: null,
      searchInfo: null,
      musicFavoritesInfo: null
    });
  }
  
  subformInitialized(name: string, group: FormGroup) {
      this.userForm.setControl(name, group);
  }

  changeStep(currentStep: string, direction: 'forward' | 'back') {
    switch(currentStep) {
      case 'loginInfoStep':
        if (direction === 'forward') {
          this.currentStepBs.next('personalInfo');
        }
        break;
      case 'personalInfoStep':
        if (direction === 'forward') {
          this.currentStepBs.next('searchInfo');
        } else if (direction === 'back') {
          this.currentStepBs.next('loginInfo');
        }
        break;    
      case 'searchInfoStep':
        if (direction === 'forward') {
          this.currentStepBs.next('musicFavoritesInfo');
        } else if (direction === 'back') {
          this.currentStepBs.next('personalInfo');
        }
        break;
      case 'musicFavoritesInfoStep':
        if (direction === 'back') {
          this.currentStepBs.next('searchInfo');
        }
        break;
    }
  }
  submitForm() {
    const formValues = this.userForm.value;
    // submit the form with a service
    console.log('submit form')
  }
}
