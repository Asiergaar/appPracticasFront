import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { TokensService } from 'src/app/shared/services/token/tokens.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.css']
})
export class TokensListComponent implements OnInit {
  public tituloPagina: string = "List of Tokens";
  public tokenList: Array<any>;
  public displayedColumns: Array<string> = ["token_id", "token_name", "ticker", "edit"];
  public dataSource: any;
  public pagesize: any;
  public max: number;
  public message: string;
  public imgurl: string;
  public isData: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tokensService: TokensService, private utils: UtilsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.tokenList = [];
    this.activatedRoute.queryParams.subscribe(params => {
      this.message = params['message'];
      this.imgurl = params['url'];
    });
   }

   async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.tokenList = await this.getTokens();
    if (this.tokenList.length == 0){
      this.router.navigate([ '/home'], { queryParams: { isData: false } } );
    }
    this.max = this.tokenList.length;
    if (this.max < 10) {this.paginator.pageSize = this.max;}
    else {this.paginator.pageSize = 10;}
    this.pagesize = this.utils.pageSize(this.max);
    this.dataSource = new MatTableDataSource(this.tokenList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.utils.menuHover('menutoken');
  }

  // get tokens data to show on form
  private getTokens(): Promise<any> {
    return new Promise(resolve => {
      let tokenList: any[];
      this.tokensService.getTokens().subscribe(
        (data: any)    => { tokenList = data.data; },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(tokenList);
        }
      )
    })
  }

  // event and filter for the filtering
  target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
