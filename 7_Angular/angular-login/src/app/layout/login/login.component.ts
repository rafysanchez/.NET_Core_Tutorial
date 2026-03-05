import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CaptchaComponent } from '../../shared/captcha/captcha.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CaptchaComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly captchaValid = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (!this.captchaValid()) {
      this.errorMessage.set('Valide o captcha para continuar.');
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    const authenticated = this.authService.login(username, password);

    if (!authenticated) {
      this.errorMessage.set('Usuário ou senha inválidos. Dica: admin/admin');
      return;
    }

    this.router.navigate(['/dashboard']);
  }

  onCaptchaResult(valid: boolean): void {
    this.captchaValid.set(valid);
    this.errorMessage.set(valid ? '' : 'Captcha inválido. Gere um novo desafio.');
  }
}
