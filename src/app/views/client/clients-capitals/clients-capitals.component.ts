import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Client } from 'src/app/shared/interfaces/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-clients-capitals',
  templateUrl: './clients-capitals.component.html',
  styleUrls: ['./clients-capitals.component.css']
})
export class ClientsCapitalsComponent implements OnInit {
  public client: Client;
  public clientsCapitals: Array<any>;
  public displayedColumns: Array<string>;
  public displayedColumnsLong: Array<string> = [];
  public displayedColumnsShort: Array<string> = ['Date', 'Benefit', 'Total', 'Divergence', 'Show Clients'];
  public dataSource: any;
  public pagesize: any;
  public max: number;
  public columnsShown: boolean = false;
  public columnsBtn: string = "Show Clients";
  public dollarUS = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientsService: ClientsService, private utils: UtilsService, private router: Router) {
    this.clientsCapitals = [];
  }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.clientsCapitals = await this.getClientsCapitals();
    if (this.clientsCapitals.length == 0){
      this.router.navigate([ '/home'], { queryParams: { isData: false } } );
    }
    for (let c in this.clientsCapitals[0]) {
      if (!c.includes('newcapital')) {
        this.displayedColumnsLong.push(c);
        if (c == 'Divergence') {
          this.displayedColumnsLong.push('Hide Clients');
        }
      }
    }
    this.displayedColumns = this.displayedColumnsShort;
    this.max = this.clientsCapitals.length;
    this.pagesize = this.utils.pageSize(this.max);
    this.dataSource = new MatTableDataSource(this.clientsCapitals);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.max < 10) {this.paginator.pageSize = this.max;}
    else {this.paginator.pageSize = 10;}
    this.paginator.pageIndex = this.paginator.pageSize;
    this.utils.menuHover('menuclient');
  }

  // get clients data to show on form
  private async getClientsCapitals(): Promise<any> {
    return new Promise(resolve => {
      let query: any[];
      this.clientsService.getClientsCapitals().subscribe(
        (data: any)    => { query = data.data; },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(query);
        }
      )
    })
  }

  // event and filter for the filtering
  public target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submit(){
    if (!this.columnsShown) {
      this.displayedColumns = this.displayedColumnsLong;
      this.columnsBtn = "Hide Clients";
      this.columnsShown = true;
    } else {
      this.displayedColumns = this.displayedColumnsShort;
      this.columnsBtn = "Show Clients";
      this.columnsShown = false;
    }
  }

}
