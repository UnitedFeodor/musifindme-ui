import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule, GridModule, FormModule } from '@coreui/angular';
import { InstrumentService } from '../../services/instrument.service';
import { FlatInstrumentDto } from '../../interfaces/user';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-search-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule, GridModule, FormModule, NgSelectModule,],
  templateUrl: './search-info.component.html',
  styleUrl: './search-info.component.scss'
})
export class SearchInfoComponent {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'forward' | 'back'> = new EventEmitter<'forward' | 'back'>()
  public searchInfoForm!: FormGroup;
  public instruments: FlatInstrumentDto[] = [];

  constructor(private _fb: FormBuilder, private instrumentService: InstrumentService) {}
 
  ngOnInit() {
    if (this.startingForm){
      console.log(`ngOnInit in if`)
      let startFormValue: any = this.startingForm;
      console.log('startFormValue',startFormValue)

      // console.log(`let startFormValue in if`)
      this.searchInfoForm = this._fb.group({
        searchingFor: [startFormValue.searchingFor, [Validators.required]],
        description: [startFormValue.description, [Validators.required]],
        instruments: [startFormValue.instruments, [Validators.required]],
      });

      

      this.searchInfoForm.get('searchingFor')!.setValidators([Validators.required]);
      this.searchInfoForm.get('description')!.setValidators([Validators.required]);

      this.searchInfoForm.setControl('instruments', new FormControl(startFormValue.instruments,[Validators.required]))
      
      // this.searchInfoForm.get('instruments')!.setValidators([Validators.required]);

      this.searchInfoForm.get('searchingFor')!.updateValueAndValidity();
      this.searchInfoForm.get('description')!.updateValueAndValidity();
      this.searchInfoForm.get('instruments')!.updateValueAndValidity();
      console.log('searchForm',this.searchInfoForm)

    } else {
      this.searchInfoForm = this._fb.group({
        searchingFor: ['', [Validators.required]],
        description: ['', [Validators.required]],
        instruments: [[], [Validators.required]],
      })
      console.log('searchForm default',this.searchInfoForm)
    }
    this.loadInstruments();
    this.subformInitialized.emit(this.searchInfoForm);
  }

  loadInstruments() {
    this.instrumentService.getAllInstruments().subscribe(
      (instruments: FlatInstrumentDto[]) => {
        this.instruments = instruments;
        console.log('Instruments fetched successfully:', instruments);
      },
      error => {
        console.error('Error fetching instruments:', error);
      }
    );
  }

  doChangeStep(direction: 'forward' | 'back') {
    this.changeStep.emit(direction);
  }


}
