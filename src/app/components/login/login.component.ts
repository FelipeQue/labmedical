import { Component, TemplateRef, inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CustomValidatorService } from '../../services/custom-validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [CustomValidatorService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  constructor (
    private customValidatorService: CustomValidatorService,
    private router: Router) {}

  @ViewChild('signupSuccess') signupSuccess!: TemplateRef<any>;
  @ViewChild('signupFieldsMissing') signupFieldsMissing!: TemplateRef<any>;
  @ViewChild('signupPasswordMatch') signupPasswordMatch!: TemplateRef<any>;

  private modalService = inject(NgbModal);
  private modalRef: any;

  loginInfo = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  signupInfo = new FormGroup({
    userName: new FormControl('', [Validators.required, this.customValidatorService.fullName()]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  openModal(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { centered: true });
  };

  closeModal(reason: string) {
    this.modalRef.dismiss(reason);
  };

  login() {
    if (this.loginInfo.value.userEmail && this.loginInfo.value.userPassword) {
      let userFound = this.checkEmail();
      if (userFound) {
        if (userFound.password == this.loginInfo.value.userPassword) {
    
          //Aqui quero deixar uma informação no localStorage sobre qual pessoa está logada:
          // let loggedUser = 

          this.router.navigate(["home"]);
        } else {
          alert("Senha incorreta. Verifique se digitou corretamente.");
        };
      } else {
        alert("Não encontramos uma conta associada a esse e-mail. Verifique se digitou corretamente ou crie uma nova conta.")
      };
    } else {
      alert("Por favor, preencha todos os campos.");
    };
  };

  checkEmail() {
    let users = this.getStorage();
    return users.find((user: { email: string | null | undefined; }) => user.email == this.loginInfo.value.userEmail);
  };



  signup() {
    if (this.signupInfo.value.userName && this.signupInfo.value.userEmail && this.signupInfo.value.userPassword && this.signupInfo.value.confirmPassword) {
      if (this.signupInfo.value.userPassword == this.signupInfo.value.confirmPassword) {
        let users = this.getStorage();
        if (users.find((user: { email: string; }) => user.email == this.signupInfo.value.userEmail)) {
          alert("Já existe um cadastro com este e-mail. Caso tenha esquecido a senha, preencha seu e-mail na tela de login e clique em ’Esqueci a senha.’");
        } else {
          this.addUser(this.signupInfo.value.userName, this.signupInfo.value.userEmail, this.signupInfo.value.userPassword);
          alert(`O cadastro da pessoa com o e-mail ${this.signupInfo.value.userEmail} foi realizado com sucesso!`);
          this.signupInfo.reset();
          this.closeModal("Submit click");
          this.openModal(this.signupSuccess); 
        }
      } else {
        this.openModal(this.signupPasswordMatch); 
      }
    } else { 
      this.openModal(this.signupFieldsMissing); 
    }
  };

  addUser (name: string, email: string, password: string) {
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    let users = this.getStorage();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  getStorage() {
    const emptyDatabase: string[] = [];
    const users = localStorage.getItem("users");
    if (!!users) {
      return JSON.parse(users);
    } else {
      localStorage.setItem("users", JSON.stringify(emptyDatabase));
      return [];
    };
  };



}
