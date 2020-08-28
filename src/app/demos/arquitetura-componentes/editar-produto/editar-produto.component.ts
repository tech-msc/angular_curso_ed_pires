import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styles: [
    '.content-editar { margin-top: 60px; }'
  ],
  
})
export class EditarProdutoComponent implements OnInit {

  constructor(private route: Router) { }


  produtoid = this.route.url

  ngOnInit() {
  }

}
