import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent,SidemenuComponent],
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  exports: [ToolbarComponent,SidemenuComponent],
})
export class SharedModule { }
