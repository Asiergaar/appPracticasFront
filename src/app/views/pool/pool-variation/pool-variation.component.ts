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
  public dollarUS = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});

  @ViewChild('homepools') private divElement:ElementRef;

  constructor(
    private poolsService: PoolsService,
    private utils: UtilsService,
    private router: Router
  ) {
    this.poolData = [];
    this.dataLength = [];
    // change this to set result quantity
    this.len = 7;
  }

  async ngOnInit(): Promise<void> {
    this.poolData = await this.getPoolsData();
    if (this.poolData.length == 0){
      this.router.navigate([ '/home'], { queryParams: { isData: false } } );
    }
    // Adjust len to max of poolData length, can't be higher
    if (this.poolData.length != 0){
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
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

  public close(card: string) {
    document.getElementById(card)?.classList.add('displaynone');
  }

  public hideshow(card: string, id: number) {
    document.getElementById("poolvararrowup"+id)?.classList.toggle("displaynone");
    document.getElementById("poolvararrowdown"+id)?.classList.toggle("displaynone");
    document.getElementById(card+id)?.classList.toggle('displaynone');
  }

}
