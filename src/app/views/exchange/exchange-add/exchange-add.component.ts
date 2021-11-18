import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exchange } from 'src/app/shared/classes/exchange/exchange';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator/validator.service';

@Component({
  selector: 'app-exchange-add',
  templateUrl: './exchange-add.component.html',
  styleUrls: ['./exchange-add.component.css']
})
export class ExchangeAddComponent implements OnInit {
  public exchange: Exchange;
  public isOnDB: boolean = true;

  constructor(private exchangesService: ExchangesService, private utils: UtilsService, private validator: ValidatorService, private router: Router) {
    this.exchange = new Exchange();
   }

  ngOnInit(): void {
    this.utils.menuHover('menuexchange');
  }


  // On form submit => create exchange on DB
  public submit(): void {
    document.getElementById('exchangeexists')?.classList.add('displaynone');
    document.getElementById('exchangeformalert')?.classList.remove('formalert');

    this.validator.checkExchange(this.exchange).subscribe(
      (data: any)    => { if(!data.data || data.data == null) {
                            this.isOnDB = false;
                          } else {
                            this.isOnDB = true;
                          }
                        },
      (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => {
                          if(!this.isOnDB) {
                            this.exchangesService.addExchange(this.exchange).subscribe(
                              (data: any)    => { this.router.navigate(['/ExchangesList'], { queryParams: { message: "Exchange: " + this.exchange.exchange_name + " added.",  url: this.exchange.exchange_img_url} } ); },
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
