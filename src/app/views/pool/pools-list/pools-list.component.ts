import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Pool } from 'src/app/shared/interfaces/pool';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pools-list',
  templateUrl: './pools-list.component.html',
  styleUrls: ['./pools-list.component.css']
})
export class PoolsListComponent implements OnInit {
  public pool: Pool;
  public poolList: Array<any>;
  public displayedColumns: Array<string> = ["pool_id", "pool_coins", "pool_pair", "invested_quantity", "pool_date"];
  public dataSource: any;
  public pagesize: any;
  public max: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private poolsService: PoolsService,private utils: UtilsService, private router: Router) {
    this.poolList = [];
   }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.poolList = await this.getPoolsName();
    this.max = this.poolList.length;
    this.pagesize = this.utils.pageSize(this.max);
    this.dataSource = new MatTableDataSource(this.poolList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.max < 10) {this.paginator.pageSize = this.max;}
    else {this.paginator.pageSize = 10;}
    this.utils.menuHover('menupool');
  }

  // get pools data to show on form
  private async getPoolsName(): Promise<any> {
    return new Promise(resolve => {
      let poolList: any[];
      this.poolsService.getPoolsName().subscribe(
        (data: any)    => { poolList = data.data; },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(poolList);
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
