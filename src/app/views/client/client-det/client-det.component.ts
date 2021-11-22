import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
  public monthList: any;
  public start_capital: number;
  public actual_capital: number;
  public id: any;
  public loaded: boolean = false;
  public dollarUS = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});
  public currentLang: string;

  constructor(private clientsService: ClientsService, private utils: UtilsService, private router: Router,private translate: TranslateService) {
    this.client = new Client();
    this.id = router.url.split('/').pop();
    this.clientInfo = [];
    this.MonthInfo = [];
    this.progress = [];
    this.monthList = [
      ['en', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      ['es', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      ['eu', 'Urtarrilak', 'Otsailak', 'Martxoak', 'Apirilak', 'Maiatzak', 'Ekainak', 'Uztailak', 'Abuztuak', 'Irailak', 'Urriak', 'Azaroak', 'Abenduak'],
      ['ca', 'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
      ['fr', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    ]
   }

  async ngOnInit(): Promise<void>{
    this.currentLang = this.translate.currentLang;
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
    let pagelang;
    let pos = 0;
    // Get used lang
    if(this.translate.currentLang == null || this.translate.currentLang == undefined) {
      pagelang = this.translate.defaultLang;
    } else {
      pagelang = this.translate.currentLang;
    }
    for (let i in this.monthList) {
      if (this.monthList[i][0] == pagelang) {
        pos = parseInt(i);
      }
    }
    let m = parseInt(date.substring(date.indexOf('-')+1, date.lastIndexOf('-')));
    let month;
    switch(m){
      case 1:  month = this.monthList[pos][1]; break;
      case 2:  month = this.monthList[pos][2]; break;
      case 3:  month = this.monthList[pos][3]; break;
      case 4:  month = this.monthList[pos][4]; break;
      case 5:  month = this.monthList[pos][5]; break;
      case 6:  month = this.monthList[pos][6]; break;
      case 7:  month = this.monthList[pos][7]; break;
      case 8:  month = this.monthList[pos][8]; break;
      case 9:  month = this.monthList[pos][9]; break;
      case 10: month = this.monthList[pos][10]; break;
      case 11: month = this.monthList[pos][11]; break;
      case 12: month = this.monthList[pos][12]; break;
    }
    return month;
  }

}
