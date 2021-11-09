import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public poolData: Array<any>;
  public dataLength: Array<number>;
  public len: number;

  @ViewChild('homepools') private divElement:ElementRef;
  showinfo: boolean = false;

  constructor(private poolsService: PoolsService, private utils: UtilsService) {
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
    this.utils.menuHover('home');
  }


  // get pool data to show on form
  public async getPoolsData(): Promise<any> {
    return new Promise(resolve => {
      let querydata: any[];
      this.poolsService.getPoolsData().subscribe(
        (data: any)    => { querydata = data.data; },
        (error: Error) => { console.log('Error: ', error); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

  appinfo(){
    if(this.showinfo){
      this.showinfo = false;
    } else {
      this.showinfo = true;
    }
  }

}
