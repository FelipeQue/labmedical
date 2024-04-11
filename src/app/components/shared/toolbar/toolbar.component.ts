import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  loggedUserName: string = "";
  loggedUser: any;

  constructor() {
    const loggedUserStorage = localStorage.getItem("loggedUser");
    if (loggedUserStorage) {
      this.loggedUser = JSON.parse(loggedUserStorage);
      this.loggedUserName = this.loggedUser.name;
    };
  };


}
