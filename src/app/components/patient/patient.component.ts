import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../services/address.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {

  constructor (private addressService: AddressService) {};

  registerMode: boolean = true;
  editingMode: boolean = false;

  // datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
  datePattern = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d{4}$/; //Este pattern não inclui separação por /, isso se dá porque a validação de data via ngx-mask não funcionou. Então criei uma validação por pattern, mas daí o [hiddenInput]="false" da máscara não funcionou. Então usei um pattern de apenas números e apliquei [hiddenInput]="true".

  patientInfo = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required, Validators.pattern(this.datePattern)]),
    cpf: new FormControl('', [Validators.required]),
    rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    maritalStatus: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    birthCity: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
    // Cara pessoa avaliadora: eu sei que o documento de especificação indicava o mínimo de 8 para o campo acima, mas existem muitas cidades cujo nome tem menos de 8 letras. O menor nome de município do Brasil tem 3.
    emergencyContact: new FormControl('', [Validators.required]),
    alergies: new FormControl(''),
    specialCare: new FormControl(''),
    insuranceCompany: new FormControl(''),
    insuranceNumber: new FormControl(''),
    insuranceExpiration: new FormControl('', Validators.pattern(this.datePattern)),
    cep: new FormControl('', [Validators.required]),
    addressStreet: new FormControl('', [Validators.required]),
    addressNumber: new FormControl(''),
    addressComplement: new FormControl(''),
    addressNeighborhood: new FormControl(''),
    addressCity: new FormControl('', [Validators.required]),
    addressState: new FormControl('', [Validators.required]),
    addressReference: new FormControl(''),
  });

  address: any | undefined;

  searchAddress() {
    this.addressService.getAddress(this.patientInfo.value.cep).subscribe(
      {
        next: (response): void => {
          this.address = response;
          this.patientInfo.patchValue({
          addressStreet: this.address.logradouro,
          addressNeighborhood: this.address.bairro,
          addressCity: this.address.localidade,
          addressState: this.address.uf}
        );
        },
        error: (error) => {
        }
      }
    );
  };

  savePatient(){
    console.log("Salvar chamado.");
  }

}
