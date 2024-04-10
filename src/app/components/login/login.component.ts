import { Component, TemplateRef, inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  @ViewChild('signupSuccess') signupSuccess!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  private modalRef: any;

  loginInfo = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  signupInfo = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  login() {
    console.log("Botão de login foi clicado.");
  };

  openModal(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { centered: true });
  };

  closeModal(reason: string) {
    this.modalRef.dismiss(reason);
  };

  signup() {
    this.signupInfo.reset();
    this.closeModal("Submit click");
    this.openModal(this.signupSuccess); 
  };



}
