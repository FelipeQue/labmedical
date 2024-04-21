import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  loggedUserName: string = "";
  loggedUser: any;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
  ){
    const loggedUserStorage = localStorage.getItem("loggedUser");
    if (loggedUserStorage) {
      this.loggedUser = JSON.parse(loggedUserStorage);
      this.loggedUserName = this.loggedUser.name;
    };
  };

  getCurrentUrl() {
    return this.router.url;
  };

  logout(){
    localStorage.setItem("loggedUser", JSON.stringify(""));
    this.toastrService.success("Logout realizado com sucesso.", '')
    this.router.navigate(["login"]);;
  };

}