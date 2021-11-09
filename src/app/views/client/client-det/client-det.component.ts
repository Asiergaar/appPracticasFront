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
  public progress: Array<number>;
  public start_capital: number;
  public actual_capital: number;
  public id: any;


  constructor(private clientsService: ClientsService, private utils: UtilsService, private router: Router) {
    this.client = new Client();
    this.id = router.url.split('/').pop();
    this.clientInfo = [];
    this.progress = [];
   }

  async ngOnInit(): Promise<void>{
   this.clientInfo =  await this.getClient();
   for(let i = this.clientInfo.length - 1; i > this.clientInfo.length - 6; i--) {
    this.progress.push(this.clientInfo[i].progress_percentage);
   }
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
        (error: Error) => { console.log('Error: ', error); },
        ()             => { console.log('Petición realizada correctamente');
                            resolve(querydata);
        }
      )
    })
  }

}
