import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {doc} from "@angular/fire/firestore";

const CONTACT_MAP_LINK = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24335.504201095213!2d-0.08546032754194606!3d51.52363186311423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876034d372b3ded%3A0x5c81b8a1a822fda8!2s30%20St%20Mary%20Axe%20(The%20Gherkin)!5e0!3m2!1sen!2sde!4v1671642701113!5m2!1sen!2sde"


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public sEmail: string;
  public sName: string;
  public sSurname: string;
  public sPhone: string;
  profileForm: FormGroup;
  bFormSubmitted: boolean;
  bRequestCallInProcess: boolean = false;

  src: string = CONTACT_MAP_LINK;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')
      ]]
    });
  }

  // Функция для облегчения доступа к контролам формы
  get formControls() {
    return this.profileForm.controls;
  }

  // Обработчик клика по кнопке
  onClickContactUs() {
    console.log('this.profileForm', this.profileForm)
    if (this.profileForm.valid) {
      console.log('Form data', this.profileForm.value);
      this.bRequestCallInProcess = true;
      setTimeout(() => {
        this.bRequestCallInProcess = false;
        this.profileForm.reset();
      }, 2000)
      // window.location.reload();
    } else {
      this.profileForm.markAllAsTouched(); // Помечает все контролы как "коснутые", что вызовет отображение сообщений об ошибках
    }
  }
}
