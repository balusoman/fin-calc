import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, skip } from 'rxjs';

@Component({
  selector: 'app-sip-calculator',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './sip-calculator.component.html',
  styleUrl: './sip-calculator.component.scss',
})
export class SipCalculatorComponent implements OnInit {
  mfForm: FormGroup = new FormGroup({
    years: new FormControl(2),
    sip: new FormControl(2000),
    rateOfInterest: new FormControl(12),
    firstCapital: new FormControl(10000),
    stepUp: new FormControl(10),
    expRatio: new FormControl(0),
  });

  totalInvestment: number = 0;
  gainedWealth: number = 0;
  finalWealth: number = 0;

  totalExpense: number = 0;

  ngOnInit(): void {
    this.mfForm.valueChanges
      .pipe(
        debounceTime(1500), // Add a delay
        map((value) => JSON.stringify(value)), // Convert the value to a JSON string
        distinctUntilChanged(), // Compare JSON strings for equality
        map((value) => JSON.parse(value)) // Convert it back to the original form
      )
      .subscribe((value: any) => {
        this.onCalculate();
      });
  }

  onCalculate() {
    this.totalInvestment = 0;
    this.gainedWealth = 0;
    this.finalWealth = 0;
    this.totalExpense = 0;
    const months = this.mfForm.value.years * 12;
    const rate = this.mfForm.value.rateOfInterest / 100 / 12;
    const mfExpRatio = this.mfForm.value.expRatio / 100 / 12;
    let sipAmt = this.mfForm.value.sip;
    let first = this.mfForm.value.firstCapital;

    for (let i = 1; i <= months; i++) {
      if (i % 13 == 0) {
        sipAmt += (sipAmt * this.mfForm.value.stepUp) / 100;
        console.log('stepUp', sipAmt);
      }
      this.totalInvestment = first + this.totalInvestment + sipAmt;

      this.finalWealth = first + this.finalWealth + sipAmt;
      let expense = this.finalWealth * mfExpRatio;
      this.totalExpense = this.totalExpense + expense;
      this.finalWealth = this.finalWealth - expense;

      let interest = this.finalWealth * rate;

      this.gainedWealth = this.gainedWealth + interest;
      this.finalWealth = this.finalWealth + interest;
      first = 0;
      console.log(
        this.totalInvestment,
        interest.toFixed(2),
        expense.toFixed(2),
        `AFTER ${i} months:` + this.finalWealth.toFixed(2),

        'TOTAL INTEREST:',
        this.gainedWealth.toFixed(2)
      );
    }
  }
}
