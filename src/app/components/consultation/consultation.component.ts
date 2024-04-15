import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultationService } from '../../services/consultation.service';
import { PatientService } from '../../services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent {

  constructor(
    private consultationService: ConsultationService,
    private toastrService: ToastrService,
    private patientService: PatientService,
  ) { };

  patientInput = new FormGroup({
    nameOrId: new FormControl('')
  });

  patientsList: any = [];
  resultsList: any = [];

  selectedPatientName: string = "";
  selectedPatientId: string = "";

  consultationInfo = new FormGroup({
    reason: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    issueDescription: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    prescribedMedication: new FormControl(''),
    dosagePrecautions: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(256)]),
  });


  searchPatient() {
    const nameOrId = this.patientInput.value.nameOrId?.trim();
    if (nameOrId) {
      this.patientService.getPatient().subscribe((patients) => {
        this.patientsList = patients;
        this.resultsList = this.patientsList.filter((searchedPatient: { name: string, id: string }) => {
          const isNameMatch = searchedPatient.name && searchedPatient.name.toLowerCase().includes(nameOrId.toLowerCase());
          const isIdMatch = searchedPatient.id && searchedPatient.id.includes(nameOrId);
          return isNameMatch || isIdMatch;
        });
      });
    } else {
      this.toastrService.warning("Preencha nome ou identificador no campo de busca.");
    }
  };

  selectPatient(name: string, id: string) {
    this.toastrService.info("Você selecionou " + name);
    this.selectedPatientName = name;
    this.selectedPatientId = id;
  }

  saveConsultation() {
    if (!!this.selectedPatientId) {
      if (this.consultationInfo.valid) {
        const newConsultation = {
          "patientId": this.selectedPatientId,
          "reason": this.consultationInfo.value.reason,
          "date": this.consultationInfo.value.date,
          "time": this.consultationInfo.value.time,
          "issueDescription": this.consultationInfo.value.issueDescription,
          "prescribedMedication": this.consultationInfo.value.prescribedMedication,
          "dosagePrecautions": this.consultationInfo.value.dosagePrecautions,
        }
        this.consultationService.addConsultation(newConsultation).subscribe({
          next: (response): void => {
            this.consultationInfo.reset();
            this.toastrService.success('Nova consulta salva com sucesso!', '');
          },
          error: (error) => {
            this.toastrService.error('Algo deu errado ao tentar salvar a nova consulta.', '');
          }
        });
      } else {
        this.toastrService.warning("Preencha todos os campos obrigatórios corretamente.");
      }
    } else {
      this.toastrService.warning("Selecione um registro de paciente — para vincular a esta consulta — através do campo de busca.");
    }
  };




}
