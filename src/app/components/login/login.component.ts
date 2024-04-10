import { Component, TemplateRef, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CustomValidatorService } from '../../services/custom-validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbAlert],
  providers: [CustomValidatorService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  constructor(
    private customValidatorService: CustomValidatorService,
    private router: Router) { };

  private modalService = inject(NgbModal);
  private modalRef: any;

  alertLoginVisibility: boolean = false;
  alertSignupVisibility: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

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

  showLoginAlert(message: string, type: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.alertLoginVisibility = true;
  };

  showSignupAlert(message: string, type: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.alertSignupVisibility = true;
  };

  login() {
    if (this.loginInfo.value.userEmail && this.loginInfo.value.userPassword) {
      let userFound = this.checkEmail(this.loginInfo.value.userEmail);
      if (userFound) {
        if (userFound.password == this.loginInfo.value.userPassword) {
          this.setLoggedUser(this.loginInfo.value.userEmail);
          this.router.navigate(["home"]);
        } else {
          this.showLoginAlert("Senha incorreta. Verifique se digitou corretamente.", "warning");
        };
      } else {
        this.showLoginAlert("Não encontramos uma conta associada a esse e-mail. Verifique se digitou corretamente ou crie uma nova conta.", "warning")
      };
    } else {
      this.showLoginAlert("Por favor, preencha todos os campos.", "warning");
    };
  };

  checkEmail(email: string) {
    let users = this.getStorage();
    return users.find((user: { email: string | null | undefined; }) => user.email == email);
  };

  setLoggedUser(email: string) {
    let loggedUser = this.checkEmail(email);
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  };

  signup() {
    if (this.signupInfo.value.userName && this.signupInfo.value.userEmail && this.signupInfo.value.userPassword && this.signupInfo.value.confirmPassword) {
      if (this.signupInfo.value.userPassword == this.signupInfo.value.confirmPassword) {
        let users = this.getStorage();
        if (users.find((user: { email: string; }) => user.email == this.signupInfo.value.userEmail)) {
          this.showSignupAlert("Já existe um cadastro com este e-mail. Caso tenha esquecido a senha, preencha seu e-mail na tela de login e clique em ’Esqueceu a senha?’", "warning");
        } else {
          this.addUser(this.signupInfo.value.userName, this.signupInfo.value.userEmail, this.signupInfo.value.userPassword);
          this.showSignupAlert(`O cadastro da pessoa com o e-mail ${this.signupInfo.value.userEmail} foi realizado com sucesso!`, "success");
          this.signupInfo.reset();
          // this.closeModal("Submit click");
        };
      } else {
        this.showSignupAlert("Os campos senha e confirmar senha devem ser iguais.", "warning");
      }
    } else {
      this.showSignupAlert("Preencha todos os campos.", "warning");
    }
  };

  addUser(name: string, email: string, password: string) {
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
