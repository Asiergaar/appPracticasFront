import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from 'src/app/shared/classes/client/client';
import { Capital } from 'src/app/shared/classes/capital/capital';
import { NewCapital } from 'src/app/shared/classes/newcapital/newcapital';
import { ClientsService } from 'src/app/shared/services/client/clients.service';
import { PoolsService } from 'src/app/shared/services/pool/pools.service';
import { CapitalsService } from 'src/app/shared/services/capital/capitals.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})

export class ClientAddComponent implements OnInit {
  public client: Client;
  public pools: any;
  public poolsStarted: boolean;
  public newCapital: NewCapital;
  public capital: Capital;

  constructor(private clientsService: ClientsService, private poolsService: PoolsService, private capitalsService: CapitalsService, private utils: UtilsService, private router: Router) {
    this.newCapital = new NewCapital();
    this.capital = new Capital();
    this.client = new Client();
   }

  async ngOnInit(): Promise<void>{
    this.pools = await this.getPools();
    if (this.pools.length > 1) {
      this.poolsStarted = true;
    }
    this.utils.menuHover('menuclient');
  }


  // get pools
  private async getPools(): Promise<any> {
    let list: any[];
    return new Promise( resolve => {
      this.poolsService.getPools().subscribe(
        (data: any)    => { list = data.data; },
        (error: Error) => { console.log('Error: ', error); },
        ()             => { console.log('Petición realizada correctamente'); resolve(list);}
      )
    })
  }

  // On form submit => create client on DB
  public submit(): void {
    console.log(this.client);

/*
    // If the pools are started
    if(this.poolsStarted) {
      const quantity = this.client.start_capital;
      this.client.start_capital = 0;
      this.clientsService.addClient(this.client).subscribe(
        (data: any)    => { this.client.client_id = data.data.client_id; },
        (error: Error) => { console.error("Error al realizar el acceso"); },
        () => {
            // Set the capital
            this.capital.capital_client =  this.client.client_id;
            this.capital.capital_quantity = quantity;
            this.capitalsService.setCapital(this.capital).subscribe();
            // Adds new capital
            this.newCapital.newcapital_client = this.client.client_id;
            this.newCapital.newcapital_quantity = quantity;
            this.capitalsService.newCapital(this.newCapital).subscribe(
              (data: any)    => { this.router.navigate(['/ClientsCapitals']).then(() => { window.location.reload(); }); },
              (error: Error) => { console.error("Error al realizar el acceso"); }
            )
        }
      )
    } else{
      // If it's the firs day of pools
      this.clientsService.addClient(this.client).subscribe(
        (data: any)    => { this.router.navigate(['/ClientsCapitals']); },
        (error: Error) => { console.error("Error al realizar el acceso"); }
      )
    }
*/
  }


}
