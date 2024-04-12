import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  loggedUserName: string = "";
  loggedUser: any;

  constructor(private router: Router) {
    const loggedUserStorage = localStorage.getItem("loggedUser");
    if (loggedUserStorage) {
      this.loggedUser = JSON.parse(loggedUserStorage);
      this.loggedUserName = this.loggedUser.name;
    };
  };

  getCurrentUrl() {
    return this.router.url;
  }


}