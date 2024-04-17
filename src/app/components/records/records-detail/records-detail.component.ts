import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { ConsultationService } from '../../../services/consultation.service';
import { ExamService } from '../../../services/exam.service';
import { CommonModule } from '@angular/common';
import { BrDatePipe } from '../../../pipes/br-date.pipe';

@Component({
  selector: 'app-records-detail',
  standalone: true,
  imports: [CommonModule, BrDatePipe],
  templateUrl: './records-detail.component.html',
  styleUrl: './records-detail.component.scss'
})
export class RecordsDetailComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private examService: ExamService,
  ) { }

  patientId: string = "";
  patient: any = {};
  patientEvents: any = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      this.patientId = parameters['id'];

      this.patientService.getPatient().subscribe((patients) => {
        this.patient = patients.find((patient: { id: string; }) => patient.id == this.patientId);
        console.log("Patient: ", this.patient);
      });
      
      let patientConsultations: any[] = [];
      this.consultationService.getConsultation().subscribe((consultations) => {
        patientConsultations = consultations.filter((consultation: { patientId: string; }) => consultation.patientId == this.patientId);
        console.log("Consultations: ",patientConsultations);

        let patientExams  = [];
        this.examService.getExam().subscribe((exams) => {
          patientExams = exams.filter((exam: { patientId: string; }) => exam.patientId == this.patientId);
          console.log("Exams: ",patientExams);

          this.patientEvents = patientConsultations.concat(patientExams);

          this.patientEvents.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
          

        });

      });


    });




  };





}
