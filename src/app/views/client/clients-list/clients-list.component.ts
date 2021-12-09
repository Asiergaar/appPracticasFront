import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Client } from 'src/app/shared/interfaces/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  public client: Client;
  public clientList: Array<any>;
  public displayedColumns: Array<string> = ["client_id", "client_name", "email", "entry_date", "start_capital", "benefit", "nwcap", 'last_capital', "edit"];
  public dataSource: any;
  public totalBenefit: number;
  public pagesize: any;
  public max: number;
  public dollarUS = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});
  public message: string;
  public allInitial: boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientsService: ClientsService, private utils: UtilsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.clientList = [];
    this.activatedRoute.queryParams.subscribe(params => {
      this.message = params['message'];
    });
   }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.clientList = await this.getClients();
    if (this.clientList.length == 0){
      this.router.navigate([ '/home'], { queryParams: { isData: false } } );
    }
    this.checkIntials();
    this.max = this.clientList.length;
    this.pagesize = this.utils.pageSize(this.max);
    this.dataSource = new MatTableDataSource(this.clientList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.max < 10) {this.paginator.pageSize = this.max;}
    else {this.paginator.pageSize = 10;}
    this.utils.menuHover('menuclient');
  }

  // get clients data to show on form
  private async getClients(): Promise<any> {
    return new Promise(resolve => {
      let clientList: any[];
      this.clientsService.getClients().subscribe(
        (data: any)    => { clientList = data.data;
                            this.totalBenefit = (data.benefit);
        },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(clientList);
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

  public applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public checkIntials(){
    for (let i = this.clientList.length-1; i > 0; i--){
      if (!this.clientList[i].isInitial) {
        this.allInitial = false;
        break;
      }
    }
  }
}
