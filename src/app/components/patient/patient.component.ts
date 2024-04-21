import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { AddressService } from '../../services/address.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PatientService } from '../../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { ExamService } from '../../services/exam.service';
import { ConsultationService } from '../../services/consultation.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleChevronLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe, FontAwesomeModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {

  constructor (
    private addressService: AddressService,
    private patientService: PatientService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private examService: ExamService,
    private consultationService: ConsultationService,
  ) {};

  editingMode: boolean = false;
  patientToEdit: any = {};
  address: any | undefined;
  datePattern = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d{4}$/;

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

  faCircleChevronLeft = faCircleChevronLeft;
  faPenToSquare = faPenToSquare;

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      let patientId = parameters['id'];
      if (patientId) {
        this.editingMode = true;
        this.getPatient(patientId);
      }
      else {
        this.editingMode = false;
      }
    });
  };

  getPatient(patientId: string) {
    this.patientService.getPatient().subscribe((patients) => {
      this.patientToEdit = patients.find((patient: { id: string; }) => patient.id == patientId);
      this.patientInfo.patchValue({
        name: this.patientToEdit.name,
        gender: this.patientToEdit.gender,
        birthDate: this.patientToEdit.birthDate,
        cpf: this.patientToEdit.cpf,
        rg: this.patientToEdit.rg,
        maritalStatus: this.patientToEdit.maritalStatus,
        phone: this.patientToEdit.phone,
        email: this.patientToEdit.email,
        birthCity: this.patientToEdit.birthCity,
        emergencyContact: this.patientToEdit.emergencyContact,
        allergies: this.patientToEdit.allergies,
        specialCare: this.patientToEdit.specialCare,
        insuranceCompany: this.patientToEdit.insuranceCompany,
        insuranceNumber: this.patientToEdit.insuranceNumber,
        insuranceExpiration: this.patientToEdit.insuranceExpiration,
        cep: this.patientToEdit.address.cep,
        addressStreet: this.patientToEdit.address.street,
        addressNumber: this.patientToEdit.address.number,
        addressComplement: this.patientToEdit.address.complement,
        addressNeighborhood: this.patientToEdit.address.neighborhood,
        addressCity: this.patientToEdit.address.city,
        addressState: this.patientToEdit.address.state,
        addressLandmark: this.patientToEdit.address.landmark,
        });
      })
  };

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
        if (this.address.logradouro) {
          this.toastrService.success('Dados de endereço encontrados.', '');
        }
        else {
          this.toastrService.error('Informações de endereço não encontradas.', '');
        };
        },
        error: (error) => {
          this.toastrService.error('CEP Inválido.', '');
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
  };

  editPatient() {
    if (this.patientInfo.valid) {
      const editedPatient = {
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
      }
      this.patientService.editPatient(this.patientToEdit.id, editedPatient).subscribe({
        next: (response): void => {
          this.toastrService.success('Registro de paciente atualizado com sucesso!', '');
          this.location.back();
        },
        error: (error) => {
          this.toastrService.error('Algo deu errado ao tentar editar este registro.', '');
        }
      });
    } else {
      this.toastrService.warning("Preencha todos os campos obrigatórios corretamente.");
    }
};  

deletePatient() {
  this.confirmDialogService.confirm('Confirmar', 'Você deseja realmente apagar este registro de paciente? Esta ação é irreversível.', "Sim", "Cancelar")
  .then(async (confirmed) => {
    if (confirmed) {
      if (await this.isDeletable(this.patientToEdit.id)) {
        this.patientService.deletePatient(this.patientToEdit.id).subscribe({
          next: (response): void => {
            this.toastrService.success('Registro de paciente apagado com sucesso!', '');
            this.router.navigate(["home"]);
          },
          error: (error) => {
            this.toastrService.error('Algo deu errado ao tentar apagar o registro.', '');
          }
        })
      } else {
        this.toastrService.warning('Não é possível apagar um registro de paciente que esteja associado a exames ou consultas.', '');
      }}
  })
  .catch((error) => {});
};

  patientEvents: any[] = [];

  isDeletable(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
    let patientConsultations: any[] = [];
      this.consultationService.getConsultation().subscribe((consultations) => {
        patientConsultations = consultations.filter((consultation: { patientId: string; }) => consultation.patientId == this.patientToEdit.Id);
        let patientExams  = [];
        this.examService.getExam().subscribe((exams) => {
          patientExams = exams.filter((exam: { patientId: string; }) => exam.patientId == this.patientToEdit.id);
          this.patientEvents = patientConsultations.concat(patientExams);
          if (this.patientEvents.length > 0) {
            resolve(false);
          } else { 
            resolve(true);
          };
        });
      });
    });
  };

  goBack() {
    this.location.back();
    };



}
