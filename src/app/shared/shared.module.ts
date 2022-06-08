import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeToFitDirective } from './resize-to-fit.directive';



@NgModule({
  declarations: [
    ResizeToFitDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResizeToFitDirective
  ]
})
export class SharedModule { }
