import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';

@Component({
  selector: 'app-root',
  imports: [SipCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fin-calc';
}
