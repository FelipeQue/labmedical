import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BirthDatePipe } from '../../pipes/birth-date.pipe';
import { ToastrService } from 'ngx-toastr';
import { ConsultationService } from '../../services/consultation.service';
import { ExamService } from '../../services/exam.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BirthDatePipe, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor (
    private patientService: PatientService,
    private toastrService: ToastrService,
    private examService: ExamService,
    private consultationService: ConsultationService,
  ) {
  }

  patientInput = new FormGroup({
    nameOrId: new FormControl('')
  });

  resultsList: any = [];
  patientsList: any = [];

  patientsAmount: number = 0;
  examsAmount: number = 0;
  consultationsAmount: number = 0;

  faStethoscope = faStethoscope;
  faMicroscope = faMicroscope;
  faPeopleGroup = faPeopleGroup;

  ngOnInit() {
    this.patientService.getPatient().subscribe((patients) => {
      this.patientsList = patients;
      this.patientsAmount = this.patientsList.length;
    });
    this.examService.getExam().subscribe((exams) => {
      let examsArray = exams;
      this.examsAmount = examsArray.length;
    });
    this.consultationService.getConsultation().subscribe((consultations) => {
      let consultationsArray = consultations;
      this.consultationsAmount = consultationsArray.length;
    });
  }

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



}
