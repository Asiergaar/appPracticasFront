import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-pool-variation',
  templateUrl: './pool-variation.component.html',
  styleUrls: ['./pool-variation.component.css']
})
export class PoolVariationComponent implements OnInit {
  public poolData: Array<any>;
  public dataLength: Array<number>;
  public len: number;

  @ViewChild('homepools') private divElement:ElementRef;

  constructor(private poolsService: PoolsService, private utils: UtilsService, private router: Router) {
    this.poolData = [];
    this.dataLength = [];
    // change this to set result quantity
    this.len = 7;
  }

  async ngOnInit(): Promise<void> {
    this.poolData = await this.getPoolsData();
    // Adjust len to max of poolData length, can't be higher
    if (this.poolData != []){
      if (this.poolData[0].length < this.len) {
        this.len = this.poolData[0].length;
      }
      for (let i = 0; i < this.len; i++){ this.dataLength.push(i) };
    }
    this.utils.menuHover('menupool');
  }


  // get pool data to show on form
  public async getPoolsData(): Promise<any> {
    return new Promise(resolve => {
      let querydata: any[];
      this.poolsService.getPoolsData().subscribe(
        (data: any)    => { querydata = data.data; },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

}
