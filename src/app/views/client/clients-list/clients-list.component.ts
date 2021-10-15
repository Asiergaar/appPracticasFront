import { Component, OnInit } from '@angular/core';

import { Client } from 'src/app/shared/interfaces/client';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  public clientList: any;

  constructor(private clientsService: ClientsService) {
    this.clientList = [];
   }

  ngOnInit(): void {
    this.getClients();
  }

  private getClients(): void {
    this.clientsService.getClients().subscribe(
      (data) => {
        this.clientList = data.data;
      },
      (error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    )
  }

}
