import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { ConsultationService } from '../../../services/consultation.service';
import { ExamService } from '../../../services/exam.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PhonePipe } from '../../../pipes/phone.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faClock, faStethoscope, faMicroscope, faPaperclip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-records-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, PhonePipe, FontAwesomeModule],
  templateUrl: './records-detail.component.html',
  styleUrl: './records-detail.component.scss'
})
export class RecordsDetailComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private examService: ExamService,
  ) { }

  patientId: string = "";
  patient: any = {};
  patientEvents: any = [];

  faCalendarDay = faCalendarDay;
  faClock = faClock;
  faStethoscope = faStethoscope;
  faMicroscope = faMicroscope;
  faPaperclip = faPaperclip;

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      this.patientId = parameters['id'];
      this.patientService.getPatient().subscribe((patients) => {
        this.patient = patients.find((patient: { id: string; }) => patient.id == this.patientId);
      });
      let patientConsultations: any[] = [];
      this.consultationService.getConsultation().subscribe((consultations) => {
        patientConsultations = consultations.filter((consultation: { patientId: string; }) => consultation.patientId == this.patientId);
        let patientExams = [];
        this.examService.getExam().subscribe((exams) => {
          patientExams = exams.filter((exam: { patientId: string; }) => exam.patientId == this.patientId);
          this.patientEvents = patientConsultations.concat(patientExams);
          this.patientEvents.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });
      });
    });
  };

  editConsultation(id: string) {
    this.router.navigate(["edit-consultation", id]);
  };

  editExam(id: string) {
    this.router.navigate(["edit-exam", id]);
  };

  editPatient(id: string) {
    this.router.navigate(["edit-patient", id]);
  };


}
