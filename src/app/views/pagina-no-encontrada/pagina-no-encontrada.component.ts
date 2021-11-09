import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-pagina-no-encontrada',
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrls: ['./pagina-no-encontrada.component.css']
})
export class PaginaNoEncontradaComponent implements OnInit {

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
    this.utils.menuHover('notfound');
  }

}
