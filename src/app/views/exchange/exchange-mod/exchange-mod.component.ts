import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exchange } from 'src/app/shared/classes/exchange/exchange';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator/validator.service';

@Component({
  selector: 'app-exchange-mod',
  templateUrl: './exchange-mod.component.html',
  styleUrls: ['./exchange-mod.component.css']
})
export class ExchangeModComponent implements OnInit {
  public exchange: Exchange;
  public exchangeInfo: any;
  public id: any;
  public isOnDB: boolean = true;
  public prevName: string;

  constructor(private exchangesService: ExchangesService, private utils: UtilsService, private validator: ValidatorService, private router: Router) {
    this.exchange = new Exchange();
    this.id = router.url.split('/').pop();
    this.exchangeInfo = [];
   }

  ngOnInit(): void {
   this.getExchange();
   this.utils.menuHover('menuexchange');
  }

  // get exchange data to show on form
  public getExchange() {
    this.exchangesService.getExchange(this.id).subscribe(
      (data: any)    => { this.exchangeInfo = data.data[0];
                          this.exchange.exchange_id = this.exchangeInfo.exchange_id;
                          this.exchange.exchange_name = this.exchangeInfo.exchange_name;
                          this.exchange.url = this.exchangeInfo.URL;
                          this.exchange.exchange_img_url = this.exchangeInfo.exchange_img_url;
                          this.prevName = this.exchangeInfo.exchange_name;
      },
      (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => { console.log('Petición realizada correctamente'); }
    )
  }

  // On form submit => modify exchange on DB
  public submit(): void {
    document.getElementById('exchangeexists')?.classList.add('displaynone');
    document.getElementById('exchangeformalert')?.classList.remove('formalert');

    this.validator.checkExchange(this.exchange).subscribe(
      (data: any)    => { if((!data.data || data.data == null)) {
                            this.isOnDB = false;
                          } else if (this.prevName.toLowerCase() != data.data.exchange_name.toLowerCase()) {
                            this.isOnDB = true;
                          } else {
                            this.isOnDB = false;
                          }
                        },
      (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => {
                          if(!this.isOnDB) {
                            this.exchangesService.modExchange(this.exchangeInfo.exchange_id, this.exchange).subscribe(
                              (data: any)    => { this.router.navigate(['/ExchangesList'], { queryParams: { message: "Exchange: " + this.exchange.exchange_name + " modified.",  url: this.exchange.exchange_img_url} } ); },
                              (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); }
                            )
                          } else {
                            if (this.isOnDB){
                              document.getElementById('exchangeexists')?.classList.remove('displaynone');
                              document.getElementById('exchangeformalert')?.classList.add('formalert');
                            }
                          }
                        }
      )
  }


}
