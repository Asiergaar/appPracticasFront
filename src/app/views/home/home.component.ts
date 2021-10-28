import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';

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

  constructor(private poolsService: PoolsService) {
    this.poolData = [];
    this.dataLength = [];
    // change this to set result quantity
    this.len = 7;
  }

  async ngOnInit(): Promise<void> {
    this.poolData = await this.getPoolsData();
    // Adjust len to max of poolData length, can't be higher
    if (this.poolData[0].length < this.len) {
      this.len = this.poolData[0].length;
    }
    for (let i = 0; i < this.len; i++){ this.dataLength.push(i) };
  }


  // get pool data to show on form
  public async getPoolsData(): Promise<any> {
    return new Promise(resolve => {
      let querydata: any[];
      this.poolsService.getPoolsData().subscribe(
        (data) => {
          querydata = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(querydata);
        }
      )
    })
  }

}
