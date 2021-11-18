import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from 'src/app/shared/classes/client/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-client-det',
  templateUrl: './client-det.component.html',
  styleUrls: ['./client-det.component.css']
})
export class ClientDetComponent implements OnInit {
  public client: Client;
  public clientInfo: Array<any>;
  public MonthInfo: Array<any>;
  public progress: Array<number>;
  public start_capital: number;
  public actual_capital: number;
  public id: any;
  public loaded: boolean = false;
  public dollarUS = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});

  constructor(private clientsService: ClientsService, private utils: UtilsService, private router: Router) {
    this.client = new Client();
    this.id = router.url.split('/').pop();
    this.clientInfo = [];
    this.MonthInfo = [];
    this.progress = [];
   }

  async ngOnInit(): Promise<void>{
   this.clientInfo =  await this.getClient();
   for(let i = this.clientInfo.length - 1; i > this.clientInfo.length - 6; i--) {
    this.progress.push(this.clientInfo[i].progress_percentage);
   }
   this.MonthInfo =  await this.clientMonthlyData();
   this.utils.menuHover('menuclient');
  }

  // get client data to show on form
  public async getClient(): Promise<any> {
    return new Promise(resolve => {
      let querydata: any[];
      this.clientsService.getClient(this.id).subscribe(
        (data: any)    => { querydata = data.data;
                            this.client.client_id = querydata[0].client_id;
                            this.client.client_name = querydata[0].client_name;
                            this.client.entry_date = querydata[0].entry_date;
                            this.client.client_surname = querydata[0].client_surname;
                            this.client.email = querydata[0].email;
                            this.client.start_capital = querydata[0].start_capital;
                            this.actual_capital = querydata[querydata.length - 1].capital_quantity;
        },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/', window.location.href.length-4), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

  // get client data to show on form
  public async clientMonthlyData(): Promise<any> {
    return new Promise(resolve => {
      let querydata: any[];
      this.clientsService.clientMonthlyData().subscribe(
        (data: any)    => { querydata = data.data; querydata = querydata[querydata.findIndex(item => item.id === this.client.client_id)].capitals; this.loaded = true; },
        (error: Error) => { console.log('Error: ', error); this.router.navigate([ '/ServerError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } ); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

  public getMonth(date: string): string | undefined {
    let m = parseInt(date.substring(date.indexOf('-')+1, date.lastIndexOf('-')));
    let month;
    switch(m){
      case 1:  month = 'January';   break;
      case 2:  month = 'February';  break;
      case 3:  month = 'March';     break;
      case 4:  month = 'April';     break;
      case 5:  month = 'May';       break;
      case 6:  month = 'June';      break;
      case 7:  month = 'July';      break;
      case 8:  month = 'August';    break;
      case 9:  month = 'September'; break;
      case 10: month = 'October';   break;
      case 11: month = 'November';  break;
      case 12: month = 'December';  break;
    }
    return month;
  }

}
