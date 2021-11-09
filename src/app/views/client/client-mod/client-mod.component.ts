import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from 'src/app/shared/classes/client/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';

import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-client-mod',
  templateUrl: './client-mod.component.html',
  styleUrls: ['./client-mod.component.css']
})
export class ClientModComponent implements OnInit {
  public client: Client;
  public clientInfo: any;
  public id: any;

  constructor(private clientsService: ClientsService, private utils: UtilsService, private router: Router) {
    this.client = new Client();
    this.id = router.url.split('/').pop();
    this.clientInfo = [];
   }

  ngOnInit(): void {
   this.getClient();
   this.utils.menuHover('menuclient');
  }

  // get client data to show on form
  public getClient() {
    this.clientsService.getClient(this.id).subscribe(
      (data: any)    => { this.clientInfo = data.data[0];
                          this.client.client_id = this.clientInfo.client_id;
                          this.client.client_name = this.clientInfo.client_name;
                          this.client.client_surname = this.clientInfo.client_surname;
                          this.client.email = this.clientInfo.email;
      },
      (error: Error) => { console.log('Error: ', error); },
      ()             => { console.log('Petición realizada correctamente'); }
    )
  }


  // On form submit => modify client on DB
  public submit(): void {
    this.clientsService.modClient(this.clientInfo.client_id, this.client).subscribe(
      (data: any)    => { this.router.navigate(['/ClientsList']); },
      (error: Error) => { console.error("Error al realizar el acceso"); }
    )
  }
}
