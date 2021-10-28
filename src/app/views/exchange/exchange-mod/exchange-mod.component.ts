import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exchange } from 'src/app/shared/classes/exchange/exchange';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

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

  // get exchange data to show on form
  public getExchange() {
    this.exchangesService.getExchange(this.id).subscribe(
      (data) => {
        this.exchangeInfo = data.data[0];
        this.exchange.exchange_id = this.exchangeInfo.exchange_id;
        this.exchange.exchange_name = this.exchangeInfo.exchange_name;
        this.exchange.url = this.exchangeInfo.URL;
        this.exchange.exchange_img_url = this.exchangeInfo.exchange_img_url;
      },
      (error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    )
  }

  // On form submit => modify exchange on DB
  public submit(): void {
    this.exchangesService.modExchange(this.exchangeInfo.exchange_id, this.exchange).subscribe(
      (data: any) => {
        this.router.navigate(['/ExchangesList']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }
}
