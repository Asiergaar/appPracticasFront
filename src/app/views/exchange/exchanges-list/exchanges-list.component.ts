import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

@Component({
  selector: 'app-exchanges-list',
  templateUrl: './exchanges-list.component.html',
  styleUrls: ['./exchanges-list.component.css']
})
export class ExchangesListComponent implements OnInit {
  public exchangeList: any;
  public displayedColumns= ["exchange_id", "exchange_name", "url", "edit"];
  public dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exchangesService: ExchangesService) {
    this.exchangeList = [];
  }

  async ngOnInit(): Promise<void>{
    this.exchangeList = await this.getExchanges();
    this.dataSource = new MatTableDataSource(this.exchangeList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private async getExchanges(): Promise<any> {
    return new Promise(resolve => {
      let exchangeList: any[];
      this.exchangesService.getExchanges().subscribe(
        (data) => {
          exchangeList = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(exchangeList);
        }
      )
    })
  }

}
