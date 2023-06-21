import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { primeModules } from './prime-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [InputComponent, SafeHtmlPipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...primeModules],
  exports: [InputComponent, SafeHtmlPipe],
})
export class SharedModule {}
