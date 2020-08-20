import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit{


  rotaAtual: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.rotaAtual = this.router.url;
  }

}
