import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exchanges-list',
  templateUrl: './exchanges-list.component.html',
  styleUrls: ['./exchanges-list.component.css']
})
export class ExchangesListComponent implements OnInit {
  public exchangeList: Array<any>;
  public displayedColumns: Array<string> = ["exchange_id", "exchange_name", "url", "edit"];
  public dataSource: any;
  public pagesize: any;
  public max: number;
  public message: string;
  public imgurl: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exchangesService: ExchangesService, private utils: UtilsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.exchangeList = [4];
    this.activatedRoute.queryParams.subscribe(params => {
      this.message = params['message'];
      this.imgurl = params['url'];
    });
  }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.exchangeList = await this.getExchanges();
    if (this.exchangeList.length == 0){
      this.router.navigate([ '/home'], { queryParams: { isData: false } } );
    }
    this.max = this.exchangeList.length;
    if (this.max < 10) {this.paginator.pageSize = this.max;}
    else {this.paginator.pageSize = 10;}
    this.pagesize = this.utils.pageSize(this.max);
    this.dataSource = new MatTableDataSource(this.exchangeList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.utils.menuHover('menuexchange');
  }

  // get exchanges data to show on form
  private async getExchanges(): Promise<any> {
    return new Promise(resolve => {
      let exchangeList: any[];
      this.exchangesService.getExchanges().subscribe(
        (data: any)    => { exchangeList = data.data; },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(exchangeList);
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
