import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Client } from 'src/app/shared/interfaces/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  public client: Client;
  public clientList: any;
  public displayedColumns= ["client_id", "client_name", "client_surname", "email", "entry_date", "start_capital", "edit"];
  public dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientsService: ClientsService) {
    this.clientList = [];
   }

  async ngOnInit(): Promise<void>{
    this.clientList = await this.getClients();
    this.dataSource = new MatTableDataSource(this.clientList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private async getClients(): Promise<any> {
    return new Promise(resolve => {
      let clientList: any[];
      this.clientsService.getClients().subscribe(
        (data) => {
          clientList = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(clientList);
        }
      )
    })
  }

  target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
