import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isFormValid: boolean = false;


  constructor(    private fb: FormBuilder){}
    ngOnInit() {
      this.signUpForm = this.fb.group({
        matricule: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^\d+$/),
          ],
        ],
        nom: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z_][a-zA-Z0-9_-]{0,30}$/),
          ],
        ],
        prenom: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z_][a-zA-Z0-9_-]{0,30}$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            // Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&:/;,])[A-Za-z\d@$!%*?&:/;,]{8,}$/)]
          ],
        ],
      });
      this.signUpForm.statusChanges.subscribe((status) => {
        this.isFormValid = status === 'VALID';
      });
  }

}
