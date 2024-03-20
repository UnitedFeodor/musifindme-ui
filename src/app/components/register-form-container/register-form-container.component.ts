import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonalInfoComponent } from "../personal-info/personal-info.component";
import { LoginInfoComponent } from "../login-info/login-info.component";
import { CommonModule } from '@angular/common';
import { SearchInfoComponent } from "../search-info/search-info.component";
import { MusicFavoritesInfoComponent } from "../music-favorites-info/music-favorites-info.component";
import { CardModule } from '@coreui/angular';
import { CreateUserDto } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

export type Step = 'personalInfo' | 'loginInfo' | 'searchInfo' | 'musicFavoritesInfo';
@Component({
    selector: 'app-register-form-container',
    standalone: true,
    templateUrl: './register-form-container.component.html',
    styleUrl: './register-form-container.component.scss',
    imports: [CardModule ,PersonalInfoComponent, LoginInfoComponent, CommonModule, ReactiveFormsModule, SearchInfoComponent, MusicFavoritesInfoComponent]
})
export class RegisterFormContainerComponent implements OnInit {

  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('loginInfo');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();
  public userForm!: FormGroup;

  constructor(private _fb: FormBuilder, private userService: UserService) {}

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
    console.log('submit formVaues',formValues)
    const createUserDto = this.mapFormDataToCreateUserDto(formValues)
    console.log('submit createUserDto',createUserDto)

    this.userService.createUser(createUserDto).subscribe(
      (response) => {
        // Handle success response
        console.log('User created successfully:', response);
      },
      (error) => {
        // Handle error response
        console.error('Error creating user:', error);
      }
    );
  }

  mapFormDataToCreateUserDto(data: any): CreateUserDto {
    const mappedData: CreateUserDto = {
      name: data.personalInfo.name,
      age: data.personalInfo.age,
      city: data.personalInfo.city,
      description: data.searchInfo.description,
      searchingFor: data.searchInfo.searchingFor,
      socials: data.personalInfo.socials.reduce((acc: any, curr: any, index: number) => {
        acc[`additionalProp${index + 1}`] = curr.link;
        return acc;
      }, {}), // TODO parse link names of social networks
      email: data.loginInfo.email,
      password: data.loginInfo.password,
      artists: data.musicFavoritesInfo.artists,
      genres: data.musicFavoritesInfo.genres,
      instruments: data.searchInfo.instruments,
      releases: data.musicFavoritesInfo.releases.map((release: any) => release.id),
      songs: data.musicFavoritesInfo.songs.map((song: any) => song.id)
    };
    return mappedData;
  }
}
