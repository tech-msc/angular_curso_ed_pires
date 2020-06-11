import { Component, OnInit, AfterViewChecked, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Usuario } from './models/usuario.model';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit, AfterViewInit {
  
  @ViewChildren(FormControlName,
    {read: ElementRef }) formInputElements: ElementRef[]
  
  public MASKS = MASKS;
  usuario : Usuario
  cadastroForm: FormGroup
  

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private formBuilder: FormBuilder) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        cpf: 'CPF em formato inválido'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };


    this.genericValidator = new GenericValidator(this.validationMessages)
   }
  
  
 

  adicionarUsuarioFormSubmit() {

    if( this.cadastroForm.dirty && this.cadastroForm.valid )
    {
      this.usuario = Object.assign( {},
                                    this.usuario, 
                                    this.cadastroForm.value)
      
      console.log('formulario recebido: ' + this.usuario.nome )
      console.log('Meu nome: ' + this.cadastroForm)

    }


  }

  ngOnInit() {

    let senhaAux = new FormControl( '' ,  
      [ Validators.required, 
        CustomValidators.rangeLength([6, 15])
      ])
    
    let senhaConfirmacaoAux = new FormControl( '' ,
      [
        Validators.required, 
        CustomValidators.rangeLength([6, 15]),
        CustomValidators.equalTo(senhaAux) 
      ]);
    

    // * Melhor quer FormGroup Method
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [ 
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(120)]
      ],
      email: ['' , [ Validators.required, Validators.email]],
      cpf: ['' , 
        [ 
          Validators.required,
          <any>NgBrazilValidators.cpf
        ] ],
      senha: senhaAux,
      senhaConfirmacao: senhaConfirmacaoAux
    });

  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }


}
