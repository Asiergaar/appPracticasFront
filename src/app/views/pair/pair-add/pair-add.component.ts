import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pair } from 'src/app/shared/classes/pair/pair';
import { PairsService } from 'src/app/shared/services/pair/pairs.service';
import { TokensService } from 'src/app/shared/services/token/tokens.service';
import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

@Component({
  selector: 'app-pair-add',
  templateUrl: './pair-add.component.html',
  styleUrls: ['./pair-add.component.css']
})
export class PairAddComponent implements OnInit {
  public pair: Pair;
  public tokenList: any;
  public exchangeList: any;

  constructor(private pairsService: PairsService, private tokensService: TokensService, private exchangesService: ExchangesService, private router: Router) {
    this.pair = new Pair();
    this.tokenList = [];
    this.exchangeList = [];
   }

  ngOnInit(): void {
    this.exchangesService.getExchanges().subscribe(
      (data) => {
        this.exchangeList = data.data;
      }
    )
    this.tokensService.getTokens().subscribe(
      (data) => {
        this.tokenList = data.data;
      }
    )
  }

  public submit(): void {
    if (this.pair.tokenB == -1) {
      this.pair.tokenB = null;
    }
    this.pairsService.addPair(this.pair).subscribe(
      (data: any) => {
        this.router.navigate(['/PairsList']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }

}
