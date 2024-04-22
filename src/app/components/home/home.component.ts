import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BirthDatePipe } from '../../pipes/birth-date.pipe';
import { ToastrService } from 'ngx-toastr';
import { ConsultationService } from '../../services/consultation.service';
import { ExamService } from '../../services/exam.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStethoscope, faMicroscope, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { AgePipe } from '../../pipes/age.pipe';
import { PhonePipe } from '../../pipes/phone.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BirthDatePipe, FontAwesomeModule, AgePipe, PhonePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor (
    private router: Router,
    private patientService: PatientService,
    private toastrService: ToastrService,
    private examService: ExamService,
    private consultationService: ConsultationService,
  ) {
  }

  patientSearch = new FormGroup({
    searchInput: new FormControl('')
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
      this.resultsList = this.patientsList;
      this.resultsList.sort((a: any,b: any) => a.name.localeCompare(b.name));
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
    const searchInput = this.patientSearch.value.searchInput?.trim();
    if (searchInput) {
      this.patientService.getPatient().subscribe((patients) => {
        this.patientsList = patients;
        this.resultsList = this.patientsList.filter((searchedPatient: { name: string, phone: string, email: string, }) => {
          const isNameMatch = searchedPatient.name && searchedPatient.name.toLowerCase().includes(searchInput.toLowerCase());
          const isPhoneMatch = searchedPatient.phone && searchedPatient.phone.includes(searchInput);
          const isEmailMatch = searchedPatient.email && searchedPatient.email.includes(searchInput);
          return isNameMatch || isPhoneMatch || isEmailMatch;
        });
        this.resultsList.sort((a: any,b: any) => a.name.localeCompare(b.name));
        if (this.resultsList.length === 0) {
          this.toastrService.error("Não foram encontrados registros de paciente com este nome, e-mail ou telefone.");
        }
      });
    } else {
      this.patientService.getPatient().subscribe((patients) => {
        this.patientsList = patients;
        this.resultsList = this.patientsList;
        this.resultsList.sort((a: any,b: any) => a.name.localeCompare(b.name));
      });
      this.toastrService.info("A lista de pacientes foi recarregada.");
    }
  };

  editPatient(id: string) {
    this.router.navigate(["edit-patient", id]);
  }

}
