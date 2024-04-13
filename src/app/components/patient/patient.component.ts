import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../services/address.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PatientService } from '../../services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {

  constructor (
    private addressService: AddressService,
    private patientService: PatientService,
    private toastrService: ToastrService,
  ) {};

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
    birthCity: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
    emergencyContact: new FormControl('', [Validators.required]),
    allergies: new FormControl(''),
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
    addressLandmark: new FormControl(''),
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
        this.toastrService.success('Dados de endereço encontrados.', '', {progressBar: true});
        },
        error: (error) => {
          this.toastrService.error('Informações de endereço não encontradas.', '');
        }
      }
    );
  };

  savePatient(){
    if (this.patientInfo.valid) {
      const newPatient = {
        "name": this.patientInfo.value.name,
        "gender": this.patientInfo.value.gender,
        "birthDate": this.patientInfo.value.birthDate,
        "cpf": this.patientInfo.value.cpf,
        "rg": this.patientInfo.value.rg,
        "maritalStatus": this.patientInfo.value.maritalStatus,
        "phone": this.patientInfo.value.phone,
        "email": this.patientInfo.value.email,
        "birthCity": this.patientInfo.value.birthCity,
        "emergencyContact": this.patientInfo.value.emergencyContact,
        "allergies": this.patientInfo.value.allergies,
        "specialCare": this.patientInfo.value.specialCare,
        "insuranceCompany": this.patientInfo.value.insuranceCompany,
        "insuranceNumber": this.patientInfo.value.insuranceNumber,
        "insuranceExpiration": this.patientInfo.value.insuranceExpiration,
        "address": {
          "cep": this.patientInfo.value.cep,
          "city": this.patientInfo.value.addressCity,
          "state": this.patientInfo.value.addressState,
          "street": this.patientInfo.value.addressStreet,
          "number": this.patientInfo.value.addressNumber,
          "complement": this.patientInfo.value.addressComplement,
          "neighborhood": this.patientInfo.value.addressNeighborhood,
          "landmark": this.patientInfo.value.addressLandmark,
        }
      };
      this.patientService.addPatient(newPatient).subscribe({
        next: (response): void => {
          this.patientInfo.reset();
          this.toastrService.success('Novo registro de paciente salvo com sucesso!', '');
        },
        error: (error) => {
          this.toastrService.error('Algo deu errado ao tentar salvar o registro de paciente.', '');
        }
    });
    } else {
      this.toastrService.warning("Preencha todos os campos obrigatórios corretamente");
    }
  }

}
