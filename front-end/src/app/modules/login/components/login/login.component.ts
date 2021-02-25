import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Login } from '../../model/login';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.form);
  }

  login(): void {
    if (this.form.invalid) return;

    const login: Login = this.form.value;
    const loginObservable = this.loginService.login(login);
  
    loginObservable.subscribe(({ data }) => {
      localStorage.setItem('token', data.token);
      const userData = JSON.parse(
        atob(data.token.split('.')[1])
      );

      if (userData.role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/worker']);
      }
    }, (err) => {
      let msg: string = "Try again later";
      if (err.status === 401) {
        msg = 'The provided email or password is incorrect';
      }
      this.snackBar.open(msg, 'Error', { duration: 5000 });
    });
  }
}
