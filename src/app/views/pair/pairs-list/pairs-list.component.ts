import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { PairsService } from 'src/app/shared/services/pair/pairs.service';

@Component({
  selector: 'app-pairs-list',
  templateUrl: './pairs-list.component.html',
  styleUrls: ['./pairs-list.component.css']
})
export class PairsListComponent implements OnInit {
  public pairList: Array<any>;
  public displayedColumns= ["pair_id", "pair_exchange", "tokenA", "tokenB", "edit"];
  public dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pairsService: PairsService) {
    this.pairList = [];
  }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.pairList = await this.getPairsName();
    console.log(this.pairList);
    this.dataSource = new MatTableDataSource(this.pairList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // get pairs data to show on form
  private async getPairsName(): Promise<any> {
    return new Promise(resolve => {
      let pairList: any[];
      this.pairsService.getPairsName().subscribe(
        (data) => {
          pairList = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(pairList);
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
