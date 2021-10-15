import { Component, OnInit } from '@angular/core';

import { Exchange } from 'src/app/shared/interfaces/exchange';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

@Component({
  selector: 'app-exchanges-list',
  templateUrl: './exchanges-list.component.html',
  styleUrls: ['./exchanges-list.component.css']
})
export class ExchangesListComponent implements OnInit {
  public exchangeList: any;

  constructor(private exchangesService: ExchangesService) {
    this.exchangeList = [];
   }

  ngOnInit(): void {
    this.getExchanges();
  }

  private getExchanges(): void {
    this.exchangesService.getExchanges().subscribe(
      (data) => {
        this.exchangeList = data.data;
      },
      (error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    )
  }

}
