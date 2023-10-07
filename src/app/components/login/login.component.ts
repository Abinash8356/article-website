import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscription: Subscription;
  showPass: boolean = false;
  hidePass: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  togglePassword() {
    this.showPass = !this.showPass;
  }

  showPassword() {
    this.hidePass = !this.hidePass;
  }


  onSubmit() {
    const password = this.loginForm.get('password').value;
    const confirmPassword = this.loginForm.get('confirmPassword').value;
    if (password === confirmPassword) {
      const payload = {
        email: this.loginForm.get('email').value,
        password: confirmPassword,
      };
      if (this.loginForm.valid) {
        this.authService.loginUser(payload).subscribe({
          next: (res) => {
            const token = res.data.token
            localStorage.setItem('token', token);
            this.router.navigate(['/articles']);
          },
          error: (error) => {
            const errMsg = error.error.message;
            this.snackBar.open(errMsg, '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          },
        });
      }
    } else {
      this.loginForm
        .get('confirmPassword')
        .setErrors({ passwordMismatch: true });
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
