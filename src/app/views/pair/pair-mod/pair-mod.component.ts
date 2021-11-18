import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pair } from 'src/app/shared/classes/pair/pair';
import { PairsService } from 'src/app/shared/services/pair/pairs.service';
import { TokensService } from 'src/app/shared/services/token/tokens.service';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator/validator.service';

@Component({
  selector: 'app-pair-mod',
  templateUrl: './pair-mod.component.html',
  styleUrls: ['./pair-mod.component.css']
})
export class PairModComponent implements OnInit {
  public pair: Pair;
  public pairInfo: any;
  public id: any;
  public pairList: Array<any>;
  public tokenList: Array<any>;
  public exchangeList: Array<any>;
  public isOnDB: boolean = true;

  constructor(private pairsService: PairsService, private tokensService: TokensService, private exchangesService: ExchangesService, private utils: UtilsService, private validator: ValidatorService, private router: Router) {
    this.pair = new Pair();
    this.id = router.url.split('/').pop();
    this.pairInfo = [];
    this.pairList = [];
    this.tokenList = [];
    this.exchangeList = [];
   }

  ngOnInit(): void {
    this.exchangesService.getExchanges().subscribe(
      (data: any) => {
        this.exchangeList = data.data;
      }
    )
    this.tokensService.getTokens().subscribe(
      (data: any) => {
        this.tokenList = data.data;
      }
    )
   this.getPair();
   this.utils.menuHover('menupair');
  }

  // get pair data to show on form
  public getPair() {
    this.pairsService.getPair(this.id).subscribe(
      (data: any)    => { this.pairInfo = data.data[0];
                          this.pair.pair_id = this.pairInfo.pair_id;
                          this.pair.tokenA = this.pairInfo.tokenA;
                          if(this.pairInfo.tokenB == null){
                            this.pair.tokenB = -1;
                          } else {
                            this.pair.tokenB = this.pairInfo.tokenB;
                          }
                          this.pair.pair_exchange = this.pairInfo.pair_exchange;
      },
      (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      () => { console.log('Petición realizada correctamente'); }
    )
  }

  // On form submit => modify pair on DB
  public submit(): void {
    if (this.pair.tokenB == -1) {
      this.pair.tokenB = null;
    }
    document.getElementById('pairexists')?.classList.add('displaynone');
    document.getElementById('pairformalert')?.classList.remove('formalert');

    this.validator.checkPair(this.pair).subscribe(
      (data: any)    => { if((!data.pair1 || data.pair1 == null) && (!data.pair2 || data.pair2 == null)) {
                            this.isOnDB = false;
                          } else {
                            this.isOnDB = true;
                          }
                        },
      (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => {
                          if(!this.isOnDB) {
                            this.pairsService.modPair(this.pairInfo.pair_id, this.pair).subscribe(
                              (data: any)    => { let messageend = "";
                                                  if (this.pair.tokenB) { messageend = ", with tokens " + this.tokenList[this.tokenList.findIndex(item => item.token_id == this.pair.tokenA)].token_name + " & " + this.tokenList[this.tokenList.findIndex(item => item.token_id == this.pair.tokenB)].token_name + ".";}
                                                  else { messageend = ", with " + this.tokenList[this.tokenList.findIndex(item => item.token_id == this.pair.tokenA)].token_name;}
                                                  this.router.navigate(['/PairsList'], { queryParams: { message: "Pair (" + this.pair.pair_id + ") modified: exchange " + this.exchangeList[this.exchangeList.findIndex(item => item.exchange_id == this.pair.pair_exchange)].exchange_name + messageend} } );
                                                },
                              (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); }
                            )
                          } else {
                            if (this.isOnDB){
                              document.getElementById('pairexists')?.classList.remove('displaynone');
                              document.getElementById('pairformalert')?.classList.add('formalert');
                            }
                          }
                        }
      )
  }


}
