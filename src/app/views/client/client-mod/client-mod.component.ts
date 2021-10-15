import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from 'src/app/shared/classes/client/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';

@Component({
  selector: 'app-client-mod',
  templateUrl: './client-mod.component.html',
  styleUrls: ['./client-mod.component.css']
})
export class ClientModComponent implements OnInit {

  public client: Client;
  public clientInfo: any;
  public id: any;

  constructor(private clientsService: ClientsService, private router: Router) {
    this.client = new Client();
    this.id = router.url.split('/').pop();
    this.clientInfo = [];
   }

  ngOnInit(): void {
   this.getClient();
  }

  public getClient() {
    this.clientsService.getClient(this.id).subscribe(
      (data) => {
        this.clientInfo = data.data[0];
        this.client.client_id = this.clientInfo.client_id;
        this.client.client_name = this.clientInfo.client_name;
        this.client.client_surname = this.clientInfo.client_surname;
        this.client.email = this.clientInfo.email;
      },
      (error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    )
  }

  public submit(): void {
    this.clientsService.modClient(this.clientInfo.client_id, this.client).subscribe(
      (data: any) => {
        localStorage.setItem('client_name', this.client.client_name);
        localStorage.setItem('client_surname', this.client.client_surname);
        localStorage.setItem('email', this.client.email);

        this.router.navigate(['/ClientsList']);
      },
      (error: Error) => {
        console.error("Error al realizar el acceso");
      }
    )
  }
}
