import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {

  registerMode: boolean = true;
  editingMode: boolean = false;

  datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
  cpfValue = '';

  patientInfo = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required, Validators.pattern(this.datePattern)]),
    cpf: new FormControl('', [Validators.required]),
    rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    maritalStatus: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    birthCity: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    emergencyContact: new FormControl('', [Validators.required]),
    alergies: new FormControl(''),
    specialCare: new FormControl(''),
    insuranceCompany: new FormControl(''),
    insuranceNumber: new FormControl(''),
    insuranceExpiration: new FormControl(''),

    cep: new FormControl('', [Validators.required]),
    addressStreet: new FormControl('', [Validators.required]),
    addressNumber: new FormControl(''),
    addressComplement: new FormControl(''),
    addressNeighborhood: new FormControl(''),
    addressCity: new FormControl('', [Validators.required]),
    addressState: new FormControl('', [Validators.required]),
    addressReference: new FormControl(''),
  
  });

  formatCpf() {
    const numericValue = this.cpfValue.replace(/\D/g, '');
    if (numericValue.length <= 11) {
      const formattedCpf = numericValue.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      );
      this.cpfValue = formattedCpf;
    }
  }

  savePatient(){
    console.log("Salvar chamado.");
  }

}
