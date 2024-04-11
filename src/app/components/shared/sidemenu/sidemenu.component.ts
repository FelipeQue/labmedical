import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {

  constructor (private router: Router) {};

  logout(){
    localStorage.setItem("loggedUser", JSON.stringify(""));
    this.router.navigate(["login"]);
    alert("Logout realizado com sucesso.");
  };


}
