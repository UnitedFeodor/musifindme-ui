import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CardModule, GridModule, FormModule } from '@coreui/angular';

@Component({
  selector: 'app-music-favorites-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule, GridModule, FormModule,],
  templateUrl: './music-favorites-info.component.html',
  styleUrl: './music-favorites-info.component.scss'
})
export class MusicFavoritesInfoComponent {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'forward' | 'back'> = new EventEmitter<'forward' | 'back'>()
  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>(); // maybe submit string
  public musicFavoritesInfoForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}
 
  ngOnInit() {
    if (this.startingForm){
      this.musicFavoritesInfoForm = this._fb.group(this.startingForm)
    } else {
      this.musicFavoritesInfoForm = this._fb.group({
        genres: '',
        artists: '',
        releases: '',
        songs: '',
      })
    }
    this.subformInitialized.emit(this.musicFavoritesInfoForm);
  }
  doChangeStep(direction: 'forward' | 'back') {
    this.changeStep.emit(direction);
  }

  onSubmit() {
    console.log('MusicFavoritesInfoComponent submit')
    this.submitForm.emit();
  }

}
