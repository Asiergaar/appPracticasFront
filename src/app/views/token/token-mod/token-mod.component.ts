import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Token } from 'src/app/shared/classes/token/token';
import { TokensService } from 'src/app/shared/services/token/tokens.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator/validator.service';

@Component({
  selector: 'app-token-mod',
  templateUrl: './token-mod.component.html',
  styleUrls: ['./token-mod.component.css']
})
export class TokenModComponent implements OnInit {
  public token: Token;
  public tokenInfo: any;
  public id: any;
  public isOnDB: boolean = true;
  public prevName: string;
  public prevTicker: string;

  constructor(
    private tokensService: TokensService,
    private utils: UtilsService,
    private validator: ValidatorService,
    private router: Router
  ) {
    this.token = new Token();
    this.id = router.url.split('/').pop();
    this.tokenInfo = [];
   }

  ngOnInit(): void {
   this.getToken();
  }

  // get token data
  public getToken() {
    this.tokensService.getToken(this.id).subscribe(
      (data: any)    => { this.tokenInfo = data.data[0];
                          this.token.token_id = this.tokenInfo.token_id;
                          this.token.token_name = this.tokenInfo.token_name;
                          this.token.ticker = this.tokenInfo.ticker;
                          this.token.token_img_url = this.tokenInfo.token_img_url;
                          this.prevName = this.tokenInfo.token_name;
                          this.prevTicker = this.tokenInfo.ticker;

      },
      (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => { console.log('Petición realizada correctamente'); }
    )
    this.utils.menuHover('menutoken');
  }

  // On form submit => check if token exists => modify token on DB
  public submit(): void {
    document.getElementById('tokenexists')?.classList.add('displaynone');
    document.getElementById('tokenformalert')?.classList.remove('formalert');

    this.validator.checkToken(this.token).subscribe(
      (data: any)    => { if(!data.data || data.data == null) {
                            this.isOnDB = false;
                          } else if (this.prevName.toLowerCase() != data.data.token_name.toLowerCase() || this.prevTicker.toLowerCase() != data.data.ticker.toLowerCase()) {
                            this.isOnDB = true;
                          } else {
                            this.isOnDB = false;
                          }
                        },
      (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => {
                          if(!this.isOnDB) {
                            this.tokensService.modToken(this.tokenInfo.token_id, this.token).subscribe(
                              (data: any)    => { this.router.navigate(['/tokensList'], { queryParams: { message: this.token.token_name + "(" + this.token.ticker + ")",  url: this.token.token_img_url, type: "mod"} } ); },
                              (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); }
                            )
                          } else {
                            if (this.isOnDB){
                              document.getElementById('tokenexists')?.classList.remove('displaynone');
                              document.getElementById('tokenformalert')?.classList.add('formalert');
                            }
                          }
                        }
      )
  }

}
