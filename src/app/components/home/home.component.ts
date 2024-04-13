import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  patients: any | undefined;

  constructor (private patientService: PatientService) {

    this.patientService.getPatient().subscribe((patients) => {this.patients = patients});

  }





}
