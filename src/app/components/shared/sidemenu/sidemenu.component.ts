import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
})
export class SidemenuComponent {

  constructor (private router: Router) {};

  faCircleInfo = faCircleInfo;
  faUserPlus = faUserPlus;
  faStethoscope = faStethoscope;
  faMicroscope = faMicroscope;
  faClipboardUser = faClipboardUser;
  faDoorOpen = faDoorOpen;


  logout(){
    localStorage.setItem("loggedUser", JSON.stringify(""));
    this.router.navigate(["login"]);
    alert("Logout realizado com sucesso.");
  };

}
