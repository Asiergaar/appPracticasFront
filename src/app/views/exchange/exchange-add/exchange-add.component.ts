import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exchange } from 'src/app/shared/classes/exchange/exchange';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-exchange-add',
  templateUrl: './exchange-add.component.html',
  styleUrls: ['./exchange-add.component.css']
})
export class ExchangeAddComponent implements OnInit {
  public exchange: Exchange;

  constructor(private exchangesService: ExchangesService, private utils: UtilsService, private router: Router) {
    this.exchange = new Exchange();
   }

  ngOnInit(): void {
    this.utils.menuHover('menuexchange');
  }


  // On form submit => create exchange on DB
  public submit(): void {
    this.exchangesService.addExchange(this.exchange).subscribe(
      (data: any)    => { this.router.navigate(['/ExchangesList']); },
      (error: Error) => { console.error("Error al realizar el acceso"); }
    )
  }

}
