import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ExchangesService } from 'src/app/shared/services/exchange/exchanges.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-exchanges-list',
  templateUrl: './exchanges-list.component.html',
  styleUrls: ['./exchanges-list.component.css']
})
export class ExchangesListComponent implements OnInit {
  public exchangeList: any;
  public displayedColumns= ["exchange_id", "exchange_name", "url", "edit"];
  public dataSource: any;
  public max: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exchangesService: ExchangesService, private utils: UtilsService) {
    this.exchangeList = [];
  }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.exchangeList = await this.getExchanges();
    this.max = this.exchangeList.length;
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
        (error: Error) => { console.log('Error: ', error); },
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
