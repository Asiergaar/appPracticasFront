import { Component, OnInit } from '@angular/core';
import { CapitalsService } from 'src/app/shared/services/capital/capitals.service';

@Component({
  selector: 'app-capital-total-compare',
  templateUrl: './capital-total-compare.component.html',
  styleUrls: ['./capital-total-compare.component.css']
})
export class CapitalTotalCompareComponent implements OnInit {
  public totals: Array<any>;
  public displayedColumns: Array<string>;
  public dataSource: any;

  constructor(private capitalsService: CapitalsService) {
    this.totals = [];
    this.displayedColumns = ['pastmonth', 'comparison', 'thismonth'];
  }

  async ngOnInit(): Promise<void> {
    this.totals = await this.getMonthTotals();
    this.dataSource = this.totals;
  }

  // get last month day capitals total
  public async getMonthTotals(): Promise<any> {
    return new Promise(resolve => {
      let querydata: any[];
      this.capitalsService.getMonthTotals().subscribe(
        (data: any)    => { querydata = data.data; },
        (error: Error) => { console.log('Error: ', error); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

}
