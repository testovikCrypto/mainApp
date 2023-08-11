import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocketClient} from "../../../../socketClient";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  //[routerLink]="'/terminal'"

  private socketClient: SocketClient
  bErrorLogin: boolean = false;
  sEmail: string = '';
  sPassword: string = '';
  loginForm: FormGroup;
  bLoginInProcess: boolean = false;
  bShowPassword: boolean = false;
  constructor(private oAuthService: AuthService,
              private oRouter: Router,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    });
  }

  // Функция для облегчения доступа к контролам формы
  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit_LoginForm = () => {
    if (this.loginForm.valid) {
      this.bLoginInProcess = true;
      this.oAuthService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data: any) => {
        this.bLoginInProcess = false;
        if (data && data.token) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          this.oRouter.navigateByUrl('/terminal/chart').then(() => {
            window.location.reload();
          })
        }else if(data && data.message) {
          console.log('Login error:', data.message);
          this.bErrorLogin = true;
          this.sEmail = '';
          this.sPassword = '';
          document.getElementById('knclyezcs').focus();
        }else {
          console.log('[onSubmit_LoginForm], unexpected error');
        }
      });
    } else {
      this.loginForm.markAllAsTouched(); // Помечает все контролы как "коснутые", что вызовет отображение сообщений об ошибках
    }
    /*if (this.sEmail && this.sPassword) {
      this.oAuthService.login(this.sEmail, this.sPassword).subscribe((data: any) => {
        if (data && data.token) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          this.oRouter.navigateByUrl('/terminal/chart')
        }else if(data && data.message) {
          console.log('Login error:', data.message);
          this.bErrorLogin = true;
          this.sEmail = '';
          this.sPassword = '';
          document.getElementById('knclyezcs').focus();
        }else {
          console.log('[onSubmit_LoginForm], unexpected error');
        }
      });
    }*/
  }

  onFieldChanged = () => {
    this.bErrorLogin = false;
  }
}
