import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Pool } from 'src/app/shared/classes/pool/pool';
import { Progress } from 'src/app/shared/classes/progress/progress';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';
import { ProgressService } from 'src/app/shared/services/progress/progress.service';
import { ClientsService } from 'src/app/shared/services/client/clients.service';
import { CapitalsService } from 'src/app/shared/services/capital/capitals.service';

@Component({
  selector: 'app-pool-update',
  templateUrl: './pool-update.component.html',
  styleUrls: ['./pool-update.component.css']
})
export class PoolUpdateComponent implements OnInit {
  public pool: Pool;
  public progress: Progress;
  public poolList: Array<any>;
  public poolStatus: Array<any>;
  public displayedColumns= ["poolupdate_pair", "exchange", "tokenA", "tokenB", "add"];
  public dataSource: any;
  public poolToDo: boolean = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private poolsService: PoolsService, private progressService: ProgressService, private clientsService: ClientsService, private capitalsService: CapitalsService, private router: Router) {
    this.pool = new Pool();
    this.progress = new Progress();
    this.poolList = [];
    this.poolStatus = [];
  }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.poolList = await this.getPoolsDistinct();
    this.poolStatus = await this.getPoolStatus();
    if(this.poolStatus.toString() != 'empty') {
      this.poolToDo = false;
    }
    this.dataSource = new MatTableDataSource(this.poolList);
    this.dataSource.sort = this.sort;
  }

  // get pairs data to show on form
  private async getPoolStatus(): Promise<any> {
    return new Promise(resolve => {
      let poolStatus: any[];
      this.poolsService.getPoolStatus().subscribe(
        (data) => {
          poolStatus = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(poolStatus);
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

  // On form submit => create pools on DB
  public async submit(value:Array<any>): Promise<void> {

    for (var key in value) {
      let pool2 = new Pool();
      pool2.pool_pair = parseInt(key);
      pool2.invested_quantity = value[key];
      this.poolsService.addPool(pool2).subscribe(
        (data: any) => {
          this.router.navigate(['/PoolsByDay']);
        },
        (error: Error) => {
          console.error("Error al realizar el acceso");
        }
      )
    }

    this. progress = await this.addProgress();
    await this.addCapitals();
  }

  private async addProgress(): Promise<any> {
    return new Promise(resolve => {
      let prog = new Progress();
      // Create progress of the pool
      this.progressService.addProgress().subscribe(
        (data: any) => {
          prog = data.progress;
          this.router.navigate(['/PoolsByDay']);
        },
        (error: Error) => {
          console.error("Error al realizar el acceso");
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(prog);
        }
      )
    })
  }

  private async addCapitals(): Promise<any> {
    // Create capitals with that progress
      this.capitalsService.addCapitals(this.progress).subscribe(
      (data: any) => {
        this.router.navigate(['/PoolsByDay']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }

}
