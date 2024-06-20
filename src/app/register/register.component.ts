import { Component, signal } from '@angular/core';
import { MaterialModule } from '../shared/module/material/material.module';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { ValidationService } from './../validation.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  error: string | null = null;
  errorMessage = signal('');
  hide = signal(true);
  successMessage: string = '';
  errorMessageRegister: string = '';
  

  protected signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    first_Name: new FormControl('', [Validators.required]),
    last_Name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.validationService.passwordMatch('password', 'confirmPassword') } as any);


  constructor(private authService: AuthService, private router: Router, private validationService: ValidationService) {
    this.watchFormControlChanges();

    this.authService.successMessage$.subscribe(message => {
      this.successMessage = message;
    });

    this.authService.errorMessage$.subscribe(message => {
      this.errorMessageRegister = message;
    });

  }
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const data = {
      username: this.signUpForm.get('username')?.value,
      first_name: this.signUpForm.get('first_Name')?.value,
      last_name: this.signUpForm.get('last_Name')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value
    };
    this.authService.signup(data);
    this.signUpForm.reset(); 
  }

  private watchFormControlChanges() {
    const controls = this.signUpForm.controls;
    Object.keys(controls).forEach(key => {
      const control = controls[key as keyof typeof controls];
      merge(control.statusChanges, control.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.signUpForm.updateValueAndValidity());
    });
  }
}
