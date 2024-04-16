import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../services/patient.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent {

  constructor (
    private toastrService: ToastrService,
    private patientService: PatientService,
    private router: Router,
  ) {}

  patientInput = new FormGroup({
    nameOrId: new FormControl('')
  });

  patientsList: any = [];
  resultsList: any = [];

  selectedPatientName: string = "";
  selectedPatientId: string = "";

  ngOnInit () {
    this.patientService.getPatient().subscribe((patients) => {
    this.patientsList = patients;
    this.resultsList = this.patientsList;
    })
  };

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
      this.patientService.getPatient().subscribe((patients) => {
        this.patientsList = patients;
        this.resultsList = this.patientsList;
      });
      this.toastrService.info("A lista de pacientes foi recarregada.");
    }
  };

  // Se eu conseguir migrar o grosso da função searchPatient para o PatientService, então precisarei de outra função para associar ao botão de busca, que seria essa daqui (investigarei isso se der tempo):
  // searchPatient() {
  //   const nameOrId = this.patientInput.value.nameOrId;
  //   if (!!nameOrId) {
  //   this.patientService.searchPatient(nameOrId).subscribe({
  //     next: (response: any): void => {
  //       this.resultsList = response;
  //       this.toastrService.success("OOK");
  //     },
  //     error: (error: any) => {
  //       this.toastrService.error('Informações de endereço não encontradas.', '');
  //     }
  //   });
  //   console.log(this.resultsList)
  //   }
  //   else {
  //     this.toastrService.warning("Preencha nome ou identificador no campo de busca.");
  //   };
  // };

  redirectToDetail(patientId: string){
    this.router.navigate(["medical-records", patientId]);
  };


}
