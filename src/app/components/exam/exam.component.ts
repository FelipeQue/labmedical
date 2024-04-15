import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../services/patient.service';
import { BirthDatePipe } from '../../pipes/birth-date.pipe';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BirthDatePipe],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {

  constructor (
    private toastrService: ToastrService,
    private patientService: PatientService,
    private examService: ExamService,
  ) {}

  patientInput = new FormGroup({
    nameOrId: new FormControl('')
  });

  patientsList: any = [];
  resultsList: any = [];

  selectedPatientName: string = "";
  selectedPatientId: string = "";

  examInfo = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', "en"), [Validators.required]),
    time: new FormControl(formatDate(new Date(), 'HH:mm', "en"), [Validators.required]),
    type: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
    laboratory: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
    documentUrl: new FormControl(''),
    results: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
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

  saveExam() {
    if (!!this.selectedPatientId) {
      if (this.examInfo.valid) {
        const newExam = {
          "patientId": this.selectedPatientId,
          "name": this.examInfo.value.name,
          "date": this.examInfo.value.date,
          "time": this.examInfo.value.time,
          "type": this.examInfo.value.type,
          "laboratory": this.examInfo.value.laboratory,
          "documentUrl": this.examInfo.value.documentUrl,
          "results": this.examInfo.value.results,
        }
        this.examService.addExam(newExam).subscribe({
          next: (response): void => {
            this.examInfo.reset();
            this.toastrService.success('Novo exame salvo com sucesso!', '');
          },
          error: (error) => {
            this.toastrService.error('Algo deu errado ao tentar salvar o novo exame.', '');
          }
        });
      } else {
        this.toastrService.warning("Preencha todos os campos obrigatórios corretamente.");
      }
    } else {
      this.toastrService.warning("Selecione um registro de paciente para vincular a este exame.");
    }
  }

}
