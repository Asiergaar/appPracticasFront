import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Token } from 'src/app/shared/classes/token/token';
import { TokensService } from 'src/app/shared/services/token/tokens.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator/validator.service';

@Component({
  selector: 'app-token-add',
  templateUrl: './token-add.component.html',
  styleUrls: ['./token-add.component.css']
})

export class TokenAddComponent implements OnInit {
  public token: Token;
  public isOnDB: boolean = true;

  constructor(private tokensService: TokensService, private utils: UtilsService, private validator: ValidatorService, private router: Router) {
    this.token = new Token();
  }

  ngOnInit(): void {
    this.utils.menuHover('menutoken');
  }


  // On form submit => create token on DB
  public submit(): void {
    document.getElementById('tokenexists')?.classList.add('displaynone');
    document.getElementById('tokenformalert')?.classList.remove('formalert');

    this.validator.checkToken(this.token).subscribe(
      (data: any)    => { if(!data.data || data.data == null) {
                            this.isOnDB = false;
                          } else {
                            this.isOnDB = true;
                          }
                        },
      (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
      ()             => {
                          if(!this.isOnDB) {
                            this.tokensService.addToken(this.token).subscribe(
                              (data: any)    => { this.router.navigate(['/TokensList']); },
                              (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); }
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
