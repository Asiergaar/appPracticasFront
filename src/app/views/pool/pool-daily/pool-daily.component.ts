import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Pool } from 'src/app/shared/interfaces/pool';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';

@Component({
  selector: 'app-pool-daily',
  templateUrl: './pool-daily.component.html',
  styleUrls: ['./pool-daily.component.css']
})
export class PoolDailyComponent implements OnInit {
  public pool: Pool;
  public poolList: any;
  public pairList: any;
  public displayedColumns= ["Date"];
  public dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private poolsService: PoolsService) {
    this.poolList = [];
    this.pairList = [];
   }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.poolList = await this.getPoolsByDay();
    for(let po in this.poolList){
      console.log(this.poolList[po]);
    }
    // Get list of pairs on pools
    this.pairList = await this.getPoolsDistinct();
    for (let pa in this.pairList) {
      this.displayedColumns.push(this.pairList[pa].exchange + ": " + this.pairList[pa].tokenA + " / " + this.pairList[pa].tokenB);

    }
    this.displayedColumns.push("TOTAL", "Increment", "Benefit");
    this.dataSource = new MatTableDataSource(this.poolList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // get pools data to show on form
  private async getPoolsByDay(): Promise<any> {
    return new Promise(resolve => {
      let poolList: any[];
      this.poolsService.getPoolsByDay().subscribe(
        (data) => {
          poolList = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(poolList);
        }
      )
    })
  }

  private async getPoolsDistinct(): Promise<any> {
    return new Promise(resolve => {
      let poolList: any[];
      this.poolsService.getPoolsDistinct().subscribe(
        (data) => {
          poolList = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
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
