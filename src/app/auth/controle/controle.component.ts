import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.scss'
})
export class ControleComponent {
  @Input() editForm!: FormGroup;
  @Input() name!: string;

}
