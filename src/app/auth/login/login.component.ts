import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isFormValid: boolean = false;


  constructor(    private fb: FormBuilder){}
    ngOnInit() {
      this.loginForm = this.fb.group({
        matricule: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^\d+$/),
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
      this.loginForm.statusChanges.subscribe((status) => {
        this.isFormValid = status === 'VALID';
      });
  }

}


