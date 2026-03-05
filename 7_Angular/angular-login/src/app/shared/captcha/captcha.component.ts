import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent {
  @Output() solved = new EventEmitter<boolean>();

  readonly firstNumber = signal(this.generateDigit());
  readonly secondNumber = signal(this.generateDigit());
  readonly answerControl = new FormControl('', [Validators.required]);

  verify(): void {
    const expected = this.firstNumber() + this.secondNumber();
    const received = Number(this.answerControl.value ?? 0);
    const valid = expected === received;
    this.solved.emit(valid);

    if (!valid) {
      this.refresh();
    }
  }

  refresh(): void {
    this.firstNumber.set(this.generateDigit());
    this.secondNumber.set(this.generateDigit());
    this.answerControl.reset('');
  }

  private generateDigit(): number {
    return Math.floor(Math.random() * 9) + 1;
  }
}
