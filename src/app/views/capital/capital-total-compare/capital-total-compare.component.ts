import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private capitalsService: CapitalsService, private router: Router) {
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
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

}
