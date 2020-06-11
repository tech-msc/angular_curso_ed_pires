import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from './models/usuario.model';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {
  public MASKS = MASKS;

  usuario : Usuario
  cadastroForm: FormGroup
  

  constructor(private formBuilder: FormBuilder) { }


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
 // FormGroup Method
    // this.cadastroForm = new FormGroup({
    //   nome: new FormControl(''),
    //   email: new FormControl(''),
    //   cpf : new FormControl(''),
    //   senha: new FormControl(''),
    //   senhaConfirmacao: new FormControl('')
    // });

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

}
