import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent {

  constructor () {};

  consultationInfo = new FormGroup({
    reason: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(64)]), 
    date: new FormControl('',[Validators.required]), 
    time: new FormControl('',[Validators.required]), 
    issueDescription: new FormControl('',[Validators.required, Validators.minLength(16), Validators.maxLength(1024)]), 
    prescribedMedication: new FormControl(''), 
    dosagePrecautions: new FormControl('',[Validators.required, Validators.minLength(16), Validators.maxLength(256)]), 
  });

  saveConsultation() {};




}
