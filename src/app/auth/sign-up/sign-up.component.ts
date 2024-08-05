import { Component, OnInit ,  } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isFormValid: boolean = false;


  constructor(    private fb: FormBuilder , private auth:AuthServiceService ,private router:Router){}
    ngOnInit() {
      this.signUpForm = this.fb.group({
        // matricule: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.minLength(3),
        //     Validators.maxLength(4),
        //     Validators.pattern(/^\d+$/),
        //   ],
        // ],
        matricule: [{ value: '', disabled: true }],

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

  
    this.auth.getNewMatricule().subscribe(data => {
      this.signUpForm.patchValue({
        matricule: data.matricule
      });
    });
  }
    
  onSignUp(){
    if(this.signUpForm.valid){

    const {nom, prenom, password } = this.signUpForm.value;
    //const token="string";

    const signUpData = {nom, prenom, password };
      console.log(signUpData);
      this.auth.signUp(signUpData).subscribe({
        
        next:(res)=>{
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['/login']);

        },
        error:(err)=>{
          if (err.status === 409) {
            alert("User already exists!");
          } else {
            alert(err.error.message);
          }
        }
      });

        } 
  }

}
