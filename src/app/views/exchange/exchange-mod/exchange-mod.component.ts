import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exchange } from 'src/app/shared/classes/exchange';
import { ExchangesService } from 'src/app/shared/services/exchanges.service';

@Component({
  selector: 'app-exchange-mod',
  templateUrl: './exchange-mod.component.html',
  styleUrls: ['./exchange-mod.component.css']
})
export class ExchangeModComponent implements OnInit {

  public exchange: Exchange;
  public exchangeInfo: any;
  public id: any;

  constructor(private exchangesService: ExchangesService, private router: Router) {
    this.exchange = new Exchange();
    this.id = router.url.split('/').pop();
    this.exchangeInfo = [];
   }

  ngOnInit(): void {
   this.getExchange();
  }

  public getExchange() {
    this.exchangesService.getExchange(this.id).subscribe(
      (data) => {
        this.exchangeInfo = data.data[0];
        this.exchange.exchange_id = this.exchangeInfo.exchange_id;
        this.exchange.exchange_name = this.exchangeInfo.exchange_name;
        this.exchange.url = this.exchangeInfo.url;
      },
      (error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    )
  }

  public submit(): void {
    this.exchangesService.modExchange(this.exchangeInfo.exchange_id, this.exchange).subscribe(
      (data: any) => {
        localStorage.setItem('exchange_name', this.exchange.exchange_name);
        localStorage.setItem('email', this.exchange.url);

        this.router.navigate(['/ExchangesList']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }
}
