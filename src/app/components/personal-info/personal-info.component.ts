import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormArray, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule, FormModule, GridModule } from '@coreui/angular';
import { isSupportedSocialByLink, isSupportedSocialByName } from '../../app.utils';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,CardModule, GridModule, FormModule, ],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'forward' | 'back'> = new EventEmitter<'forward' | 'back'>()
  
  public personalInfoForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}
 
  isSupportedSocialByLink = isSupportedSocialByLink

  ngOnInit() {
    if (this.startingForm) {

      let startFormValue: any = this.startingForm;
      this.personalInfoForm = this._fb.group({
        name: [startFormValue['name'],[Validators.required]],
        age: [startFormValue['age'],[Validators.required]],
        city: [startFormValue['city'],[Validators.required]],
        socials: this._fb.array(
          [],
          [
            Validators.required, 
            this.nonEmptySocialLinksValidator(),
            this.socialLinkValidator()
          ]
        ), // Initialize as empty FormArray
      });
  
      // Populate socials FormArray with existing social media inputs
      const socialsFormArray = this.personalInfoForm.get('socials') as FormArray;
      const startingSocials = startFormValue.socials || [];
      startingSocials.forEach((social: any) => {

        if (social.link.trim() !== '') {
          const socialFormGroup = this._fb.group({
            link: social.link, 
          });
          socialsFormArray.push(socialFormGroup);
        }
      });
      
      console.log(`this.personalInfoForm`,this.personalInfoForm)
      
    } else {
      this.personalInfoForm = this._fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        city: ['', Validators.required],
        socials: this._fb.array(
          [],
          [
            Validators.required, 
            this.nonEmptySocialLinksValidator(),
            this.socialLinkValidator()
          ]
        ),
      });
      console.log(`new form`,this.personalInfoForm)
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }  
  
  nonEmptySocialLinksValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const socialsArray = control as FormArray;
      const hasEmptyString = socialsArray.controls.some(control => control.value.link.trim() === '');
      return hasEmptyString ? { 'emptySocialLinks': true } : null;
    };
  }

  
  socialLinkValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const socialsArray = control as FormArray;
      const errors: ValidationErrors = {};
  
      socialsArray.controls.forEach((socialControl, index) => {
        const link = socialControl.value.link.trim();
        
        console.log('trimmed link', link); // TODO parse name on submit to save in proper json for post
        if (!link) {
          errors[`emptyLink${index}`] = 'Link is required.';
        } else {
          if (!isSupportedSocialByLink(link)) {
            errors[`unsupportedSocial${index}`] = 'Unsupported social network.';
          }
        }
      });
  
      console.log('errors',errors)
      return Object.keys(errors).length ? errors : null;
    };
  }

  get socials(): FormArray {
    console.log(`get socials  `,this.personalInfoForm.get('socials') as FormArray)
    return this.personalInfoForm.get('socials') as FormArray;
  }
  
  addSocial() {
    const socialFormGroup = this._fb.group({
      link: ['']
    });
    console.log(`this.socials is `,this.socials)
    this.socials.push(socialFormGroup);
  }
  
  removeSocial(index: number) {
    this.socials.removeAt(index);
  }

  doChangeStep(direction: 'forward' | 'back') {
    this.changeStep.emit(direction);
  }
  
}
