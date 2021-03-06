import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pair } from 'src/app/shared/classes/pair/pair';
import { PairsService } from 'src/app/shared/services/pair/pairs.service';
import { TokensService } from 'src/app/shared/services/token/tokens.service';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator/validator.service';

@Component({
  selector: 'app-pair-add',
  templateUrl: './pair-add.component.html',
  styleUrls: ['./pair-add.component.css']
})
export class PairAddComponent implements OnInit {
  public pair: Pair;
  public tokenList: Array<any>;
  public exchangeList: Array<any>;
  public isOnDB: boolean = true;

  constructor(
    private pairsService: PairsService,
    private tokensService: TokensService,
    private exchangesService: ExchangesService,
    private utils: UtilsService,
    private validator: ValidatorService,
    private router: Router
  ) {
    this.pair = new Pair();
    this.tokenList = [];
    this.exchangeList = [];
   }

  ngOnInit(): void {
    // Gets exchanges data
    this.exchangesService.getExchanges().subscribe(
      (data: any) => { this.exchangeList = data.data; }
    )
    // Gets tokens data
    this.tokensService.getTokens().subscribe(
      (data: any) => { this.tokenList = data.data; }
    )
    this.utils.menuHover('menupair');

  }


  // On form submit => check if pair exists => create pair on DB
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
      (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => {
                          if(!this.isOnDB) {
                            this.pairsService.addPair(this.pair).subscribe(
                              (data: any) => { 
                                const exchange = this.exchangeList[this.exchangeList.findIndex(item => item.exchange_id == this.pair.pair_exchange)].exchange_name;
                                const tokenA = this.tokenList[this.tokenList.findIndex(item => item.token_id == this.pair.tokenA)].token_name;
                                let tokenB: string;
                                try {
                                  tokenB = " & " + this.tokenList[this.tokenList.findIndex(item => item.token_id == this.pair.tokenB)].token_name;
                                } catch (error) {
                                  tokenB = '';
                                }
                                this.router.navigate(['/pairsList'], { queryParams: { message: exchange + " -> " + tokenA + tokenB, type: "add"} } ); 
                              },
                              (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); }
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
