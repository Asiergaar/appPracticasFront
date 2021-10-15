import { Component, OnInit } from '@angular/core';

import { Client } from 'src/app/shared/interfaces/client';
import { TokensService } from 'src/app/shared/services/token/tokens.service';

@Component({
  selector: 'app-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.css']
})
export class TokensListComponent implements OnInit {
  public tokenList: any;

  constructor(private tokensService: TokensService) {
    this.tokenList = [];
   }

  ngOnInit(): void {
    this.getTokens();
  }

  private getTokens(): void {
    this.tokensService.getTokens().subscribe(
      (data) => {
        this.tokenList = data.data;
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
