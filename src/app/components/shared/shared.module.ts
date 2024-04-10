import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [ToolbarComponent,SidemenuComponent],
  imports: [CommonModule],
  exports: [ToolbarComponent,SidemenuComponent],
})
export class SharedModule { }
