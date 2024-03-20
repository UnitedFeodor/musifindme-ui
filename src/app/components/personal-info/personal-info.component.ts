import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule, FormModule, GridModule } from '@coreui/angular';

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
 
  ngOnInit() {
    if (this.startingForm) {

      let startFormValue: any = this.startingForm;
      this.personalInfoForm = this._fb.group({
        name: startFormValue['name'],
        age: startFormValue['age'],
        city: startFormValue['city'],
        socials: this._fb.array([]), // Initialize as empty FormArray
      });
  
      // Populate socials FormArray with existing social media inputs
      const socialsFormArray = this.personalInfoForm.get('socials') as FormArray;
      const startingSocials = startFormValue.socials || [];
      startingSocials.forEach((social: any) => {
        // Check if the 'link' property is not empty before adding it to the FormArray
        if (social.link.trim() !== '') {
          const socialFormGroup = this._fb.group({
            link: social.link, // Assuming each social object has a 'link' property
          });
          socialsFormArray.push(socialFormGroup);
        }
      });
      
      console.log(`this.personalInfoForm`,this.personalInfoForm)
      
    } else {
      this.personalInfoForm = this._fb.group({
        name: [''],
        age: [''],
        city: [''],
        socials: this._fb.array([]),
      });
      console.log(`new fomr`,this.personalInfoForm)
      // this.addSocial(); // Add one initial social input
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }

  
  
  get socials(): FormArray {
    console.log(`get socials  `,this.personalInfoForm.get('socials') as FormArray)
    return this.personalInfoForm.get('socials') as FormArray;
  }
  
  addSocial() {
    // let socialFormGroup = new FormControl('')
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
