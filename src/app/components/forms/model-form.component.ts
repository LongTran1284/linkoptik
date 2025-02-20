import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LgIcon, LgPassword, LgSelectbox, optionItem } from 'lg-components';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'model-form',
  standalone: true,
  imports: [
    CommonModule, 
    LgIcon, LgSelectbox,   
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  template: `
    <div class=" rounded shadow-lg p-2 border relative">
      <!-- <div class="flex place-content-between mb-5 w-full">
        <div class="py-3 mx-auto text-xl md:text-2xl edit_color">Change Password</div>        
      </div>
      <div class="text-red-500 text-2xl md:text-3xl p-0 m-0 cursor-pointer absolute -top-2 right-0" 
        (click)="closeForm()"><lg-icon name="xmark"></lg-icon></div> -->
      
      <form *ngIf="!isResetting" [formGroup]="modelForm" (ngSubmit)="applyModel()">        
        <div class=" mb-5 ">
          <lg-selectbox label="Main Machine" [options]="machineOption" [arrow]="false"
          [required]="true"  controlKey="mainMachine"
          ></lg-selectbox>
        </div>

        <div class=" mb-5 " >
          <lg-selectbox label="Disperser" [options]="disperserOption" [arrow]="false"
          [required]="true" controlKey="disperser"></lg-selectbox>
        </div>       
       
        <div class="mb-5 " >
          <button type="submit" class="w-full btn submit">Apply</button>
        </div>
        
      </form>
    </div>
  `,
  styles: ``
})
export class ModelFormComponent {
  @Output() apply_model = new EventEmitter()
  
  modelForm = new FormGroup({
    mainMachine: new FormControl('', Validators.required), 
    disperser: new FormControl('', Validators.required),    
  })
  isResetting: boolean = false

  machineOption: optionItem[] = [
    {key: 'LT2200E', value: 'LT2200E'},
    {key: 'LT2200', value: 'LT2200'},
    {key: 'LT3600', value: 'LT3600'},
    {key: 'LT3600 Plus', value: 'LT3600 Plus'}
  ]

  disperserOption: optionItem[] = [
    {key: 'Hydrolink SE', value: 'Hydrolink SE'},
    {key: 'Hydrolink', value: 'Hydrolink'},
    {key: 'Hydrolink SV', value: 'Hydrolink SV'},
    {key: 'Aerolink', value: 'Aerolink'}
  ]

  constructor(private eventService: EventService){
    this.eventService.listen('openModelForm', data => {
        // reset form when opening
        this.isResetting = true
        setTimeout(() => {
            this.isResetting = false
        }, 0);
    })
  }
  
  applyModel(){
    if (this.modelForm.valid){
        const mainMachine: string = this.modelForm.get('mainMachine')?.value || ''
        const disperser: string = this.modelForm.get('disperser')?.value || ''
        this.apply_model.emit(`${mainMachine} + ${disperser}`)        
    } else alert('Please fill all required info.')
  }  
}

