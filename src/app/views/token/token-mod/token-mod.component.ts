import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Token } from 'src/app/shared/classes/token/token';
import { TokensService } from 'src/app/shared/services/token/tokens.service';

@Component({
  selector: 'app-token-mod',
  templateUrl: './token-mod.component.html',
  styleUrls: ['./token-mod.component.css']
})
export class TokenModComponent implements OnInit {

  public token: Token;
  public tokenInfo: any;
  public id: any;

  constructor(private tokensService: TokensService, private router: Router) {
    this.token = new Token();
    this.id = router.url.split('/').pop();
    this.tokenInfo = [];
   }

  ngOnInit(): void {
   this.getToken();
  }

  public getToken() {
    this.tokensService.getToken(this.id).subscribe(
      (data) => {
        this.tokenInfo = data.data[0];
        this.token.token_id = this.tokenInfo.token_id;
        this.token.token_name = this.tokenInfo.token_name;
        this.token.ticker = this.tokenInfo.ticker;
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
    this.tokensService.modToken(this.tokenInfo.token_id, this.token).subscribe(
      (data: any) => {
        this.router.navigate(['/TokensList']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }
}
