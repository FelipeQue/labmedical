import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleInfo, faUserPlus, faStethoscope, faMicroscope, faClipboardUser, faDoorOpen, faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
})
export class SidemenuComponent {

  constructor (
    private router: Router,
    private toastrService: ToastrService,
  ) {};

  expanded = true;

  faCircleInfo = faCircleInfo;
  faUserPlus = faUserPlus;
  faStethoscope = faStethoscope;
  faMicroscope = faMicroscope;
  faClipboardUser = faClipboardUser;
  faDoorOpen = faDoorOpen;
  faSquareCaretLeft = faSquareCaretLeft;
  faSquareCaretRight = faSquareCaretRight;

  logout(){
    localStorage.setItem("loggedUser", JSON.stringify(""));
    this.toastrService.success("Logout realizado com sucesso.", '')
    this.router.navigate(["login"]);;
  };

}
