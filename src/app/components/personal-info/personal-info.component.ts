import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../register-form-container/register-form-container.component';
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
    if (this.startingForm){
      this.personalInfoForm = this._fb.group(this.startingForm)
    } else {
      this.personalInfoForm = this._fb.group({
        name: '',
        age: '',
        city: '',
        socials: '',
      })
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }
  doChangeStep(direction: 'forward' | 'back') {
    this.changeStep.emit(direction);
  }
  
}
