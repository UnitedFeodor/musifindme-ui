import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule, GridModule, FormModule } from '@coreui/angular';

@Component({
  selector: 'app-search-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule, GridModule, FormModule, ],
  templateUrl: './search-info.component.html',
  styleUrl: './search-info.component.scss'
})
export class SearchInfoComponent {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'forward' | 'back'> = new EventEmitter<'forward' | 'back'>()
  public searchInfoForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}
 
  ngOnInit() {
    if (this.startingForm){
      this.searchInfoForm = this._fb.group(this.startingForm)
    } else {
      this.searchInfoForm = this._fb.group({
        searchingFor: '',
        description: '',
        instruments: '',
      })
    }
    this.subformInitialized.emit(this.searchInfoForm);
  }
  doChangeStep(direction: 'forward' | 'back') {
    this.changeStep.emit(direction);
  }


}
