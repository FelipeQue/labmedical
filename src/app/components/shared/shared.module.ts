import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ToolbarComponent,SidemenuComponent, ConfirmDialogComponent],
  imports: [CommonModule, FontAwesomeModule, RouterLink, NgbDropdownModule],
  exports: [ToolbarComponent,SidemenuComponent, ConfirmDialogComponent],
})
export class SharedModule { }
