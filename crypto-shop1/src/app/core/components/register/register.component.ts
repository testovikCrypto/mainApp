import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as intlTelInput from "intl-tel-input";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocketClient} from "../../../../socketClient";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit{
  private socketClient: SocketClient
  selectedPhoneCountry: string = ''
  @ViewChild("itiInputPhone") input?: ElementRef<HTMLElement>;
  bErrorRegistration: boolean = false;
  sErrorMessage: string = '';
  registerForm: FormGroup

  constructor(private oAuthService: AuthService,
              private oRouter: Router,
              private formBuilder: FormBuilder
  ) {
  }

  sName: string = '';
  sSurname: string = '';
  sEmail: string = '';
  sNumber: string = '';
  sPassword: string = '';
  sRepeatPassword: string = '';
  sPromoCode: string = '';
  bRegistrationInProcess: boolean = false;

  ngOnInit() {
    function matchPassword(group: FormGroup): {[key: string]: any} | null {
      const password = group.get('password');
      const confirmPassword = group.get('confirmPassword');

      // убедимся, что оба поля заполнены
      if (!password || !confirmPassword) {
        return null;
      }

      // возвращаем ошибку, если пароли не совпадают
      if (password.value !== confirmPassword.value) {
        return {'mismatch': true};
      }

      return null;
    }

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
      refCode: [''],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    }, {validators: matchPassword});
  }

  ngAfterViewInit () {
    window.scrollTo(0, 0)

    if (this.input) {
      intlTelInput(this.input.nativeElement, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          fetch("https://ipapi.co/json")
            .then(function(res) { return res.json(); })
            .then(function(data) { callback(data.country_code); })
            .catch(function() { callback("ua"); });
        },
      })
    }
  }

 /* onGoToLogin = () => {
    this.oRouter.navigateByUrl('/auth/login')
  }*/

  // Функция для облегчения доступа к контролам формы
  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit_RegistrationForm(event: any) {
    event.preventDefault();
    const input = document.querySelector('#itiInputPhone');
    let iti = window.intlTelInputGlobals.getInstance(input);
    let sFinalPhoneNumber = iti.getNumber();
    if (this.registerForm.valid) {
      console.log('Form data', this.registerForm.value);
      this.bRegistrationInProcess = true;

      this.oAuthService.register(this.registerForm.value.name
        , this.registerForm.value.surname
        , this.registerForm.value.email
        , sFinalPhoneNumber
        , this.registerForm.value.password)
        .subscribe((data: any) => {
          if (data && data.token) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            this.bRegistrationInProcess = true;
            this.oRouter.navigateByUrl('/terminal/chart').then(() => {
              window.location.reload();
            })
          }else {
            console.log('Login error:', data);
            this.bErrorRegistration = true;
            this.bRegistrationInProcess = false;
            if (data.message === 'User already exists') {
              this.sErrorMessage = 'Пользователь уже зарегестрирован, выполните вход.';
            }else {
              this.sErrorMessage = 'Ошибка в ходе регистрации, обратитсь в поддержку или попробуйте позже.';
            }
          }
        })
    } else {
      this.registerForm.markAllAsTouched(); // Помечает все контролы как "коснутые", что вызовет отображение сообщений об ошибках
    }

    console.log('iti', iti.getNumber())
    console.log('intlTelInput', this.input)

    /*this.oAuthService.getRegisteredSuccess().subscribe((data) => {
      if (data && data.token) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        this.oRouter.navigateByUrl('/terminal')
      }
    });
    this.oAuthService.getRegisteredError().subscribe((error) => {
      console.log('Login error:', error);
      this.bErrorRegistration = true;
      if (error.message === 'User already exists') {
        this.sErrorMessage = 'Пользователь уже зарегестрирован, выполните вход.';
      }else {
        this.sErrorMessage = 'Ошибка в ходе регистрации, обратитсь в поддержку или попробуйте позже.';
      }
      this.sName = '';
      this.sSurname = '';
      this.sEmail = '';
      this.sNumber = '';
      this.sPassword = '';
      this.sRepeatPassword = '';
      this.sPromoCode = '';
      document.getElementById('zw0fw9mpl').focus();
    });*/
  }
}
