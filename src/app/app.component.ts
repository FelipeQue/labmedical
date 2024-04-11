import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SharedModule } from './components/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LABMedical';

  constructor (private router: Router) {};

  get isLoginPage(): boolean {
    const authPages = ['/login'];
    return authPages.includes(this.router.url);
  };

}
