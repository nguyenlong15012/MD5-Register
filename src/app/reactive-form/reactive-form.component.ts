import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomvalidationService} from "../service/customvalidation.service";
import {Countries} from "../countries";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  //@ts-ignore
  registerForm: FormGroup;
  submitted = false;

  countries: Countries[] = [
    {id: 1,
      name: 'VIETNAMESE'},
    {id: 2,
      name: 'THAILAND'},
    {id: 3,
      name: 'LAOS'}
  ];

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
        password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
        confirmPassword: ['',Validators.required],
        country: ['', Validators.required],
        age: ['', [Validators.required, Validators.minLength(18)]],
        gender: ['', Validators.required],
        phone: ['', Validators.compose([Validators.required, this.customValidator.patternValidatorPhone()])],

      },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }
}
