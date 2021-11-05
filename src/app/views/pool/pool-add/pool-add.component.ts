import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pool } from 'src/app/shared/classes/pool/pool';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';
import { PairsService } from 'src/app/shared/services/pair/pairs.service';

@Component({
  selector: 'app-pool-add',
  templateUrl: './pool-add.component.html',
  styleUrls: ['./pool-add.component.css']
})
export class PoolAddComponent implements OnInit {
  public pool: Pool;
  public pairList: any;

  constructor(private poolsService: PoolsService, private pairsService: PairsService, private router: Router) {
    this.pool = new Pool();
    this.pairList = [];
   }

  ngOnInit(): void {
    // Gets pairs list
    this.pairsService.getPairsName().subscribe(
      (data: any) => { this.pairList = data.data; }
    )
  }


  // On form submit => create pool on DB
  public submit(): void {
    this.poolsService.addPool(this.pool).subscribe(
      (data: any)    => { this.router.navigate(['/PoolsList']);  },
      (error: Error) => { console.error("Error al realizar el acceso"); }
    )
  }

}
