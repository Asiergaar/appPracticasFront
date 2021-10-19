import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exchange } from 'src/app/shared/classes/exchange/exchange';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

@Component({
  selector: 'app-exchange-add',
  templateUrl: './exchange-add.component.html',
  styleUrls: ['./exchange-add.component.css']
})
export class ExchangeAddComponent implements OnInit {

  public exchange: Exchange;

  constructor(private exchangesService: ExchangesService, private router: Router) {
    this.exchange = new Exchange();
   }

  ngOnInit(): void {
  }

  public submit(): void {
    this.exchangesService.addExchange(this.exchange).subscribe(
      (data: any) => {
        this.router.navigate(['/ExchangesList']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }

}
