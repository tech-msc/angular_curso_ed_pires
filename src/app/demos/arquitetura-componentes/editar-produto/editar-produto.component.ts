import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styles: [
    '.content-editar { margin-top: 60px; }'
  ],
  
})
export class EditarProdutoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private produtoService: ProdutoService) { }


  produtoid;
  produto ;

  ngOnInit() {
    this.route.params
      .subscribe( params => {
        this.produtoid = params['id']; // <== id declarado nas rotas

        this.produto = this.produtoService.obterPorId(this.produtoid)
        // this.produto = this.produtoService.obterTodos()

      })
  }

  salvar() {
    // this.router.navigateByUrl('produtos');
    this.router.navigate(['/produtos']);
  }

}
