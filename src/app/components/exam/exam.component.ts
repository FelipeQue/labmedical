import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../services/patient.service';
import { BirthDatePipe } from '../../pipes/birth-date.pipe';

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
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
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
    console.log("Save Exam button clicked.")
  }

}
