import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pool } from 'src/app/shared/classes/pool/pool';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';
import { PairsService } from 'src/app/shared/services/pair/pairs.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-pool-add',
  templateUrl: './pool-add.component.html',
  styleUrls: ['./pool-add.component.css']
})
export class PoolAddComponent implements OnInit {
  public pool: Pool;
  public pairList: Array<any>;
  public poolList: Array<any>;
  public pairsleft: boolean = true;
  public notUsedPairs: Array<any>;

  constructor(private poolsService: PoolsService, private pairsService: PairsService, private utils: UtilsService, private router: Router) {
    this.pool = new Pool();
    this.pairList = [];
    this.poolList = [];
    this.notUsedPairs = [];
   }

  ngOnInit(): void {
    // Gets pairs list
    this.pairsService.getPairsName().subscribe(
      (data: any) => {
        this.pairList = data.data;
        this.poolsService.getPoolsDistinct().subscribe(
          (data: any) => {
            this.poolList = data.data;
              for (let p in this.pairList){
                if (!this.poolList.some(item => item.pool_pair === this.pairList[p].id)) {
                  this.notUsedPairs.push(this.pairList[p]);
              }
            }
            if (this.poolList.length == this.pairList.length) {
              this.pairsleft = false;
            }
          }
        )
      }
    )
    this.utils.menuHover('menupool');
  }


  // On form submit => create pool on DB
  public submit(): void {
    this.poolsService.addPool(this.pool).subscribe(
      (data: any)    => { let messageend = "";
                          if (this.pairList[this.pairList.findIndex(item => item.id == this.pool.pool_pair)].tokenB == null) { messageend = ", token: " + this.pairList[this.pairList.findIndex(item => item.id == this.pool.pool_pair)].tokenA + ")."; }
                          else { messageend = ", tokens: " + this.pairList[this.pairList.findIndex(item => item.id == this.pool.pool_pair)].tokenA + " & " + this.pairList[this.pairList.findIndex(item => item.id == this.pool.pool_pair)].tokenB + ")."; }
                          this.router.navigate(['/PoolsByDay'], { queryParams: { message: "Pool succesfully added (exchange: " + this.pairList[this.pairList.findIndex(item => item.id == this.pool.pool_pair)].exchange + messageend } } ); },
      (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); }
    )
  }

}
