import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Token } from 'src/app/shared/classes/token/token';
import { TokensService } from 'src/app/shared/services/token/tokens.service';

@Component({
  selector: 'app-token-add',
  templateUrl: './token-add.component.html',
  styleUrls: ['./token-add.component.css']
})
export class TokenAddComponent implements OnInit {

  public token: Token;

  constructor(private tokensService: TokensService, private router: Router) {
    this.token = new Token();
   }

  ngOnInit(): void {
  }

  public submit(): void {
    this.tokensService.addToken(this.token).subscribe(
      (data: any) => {
        this.router.navigate(['/TokensList']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }

}
