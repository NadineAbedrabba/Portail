import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isFormValid: boolean = false;


  constructor(    private fb: FormBuilder ,private auth:AuthServiceService , private router: Router){}
    ngOnInit() {
      this.loginForm = this.fb.group({
        matricule: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
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
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          alert(res.message);
          this.router.navigate(['/']);

        },
        error:(err)=>{
          alert(err.error.message)
        }
  })
}

  }}


