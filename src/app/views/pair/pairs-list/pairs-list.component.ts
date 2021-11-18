import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { PairsService } from 'src/app/shared/services/pair/pairs.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pairs-list',
  templateUrl: './pairs-list.component.html',
  styleUrls: ['./pairs-list.component.css']
})
export class PairsListComponent implements OnInit {
  public pairList: Array<any>;
  public displayedColumns: Array<string> = ["pair_id", "pair_exchange", "tokenA", "tokenB", "edit"];
  public dataSource: any;
  public max: number;
  public message: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pairsService: PairsService, private utils: UtilsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.pairList = [];
    this.activatedRoute.queryParams.subscribe(params => {
      this.message = params['message'];
    });
  }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.pairList = await this.getPairsName();
    this.max = this.pairList.length;
    this.dataSource = new MatTableDataSource(this.pairList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.utils.menuHover('menupair');
  }

  // get pairs data to show on form
  private async getPairsName(): Promise<any> {
    return new Promise(resolve => {
      let pairList: any[];
      this.pairsService.getPairsName().subscribe(
        (data: any)    => { pairList = data.data; },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
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
