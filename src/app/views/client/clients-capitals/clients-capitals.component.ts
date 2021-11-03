import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { NewCapital } from 'src/app/shared/classes/newcapital/newcapital';
import { Client } from 'src/app/shared/interfaces/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';
import { CapitalsService } from 'src/app/shared/services/capital/capitals.service';

@Component({
  selector: 'app-clients-capitals',
  templateUrl: './clients-capitals.component.html',
  styleUrls: ['./clients-capitals.component.css']
})
export class ClientsCapitalsComponent implements OnInit {
  public client: Client;
  public newCapital: NewCapital;
  public clientsCapitals: Array<any>;
  public clients: Array<any>;
  public displayedColumns: Array<string>;
  public dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientsService: ClientsService, private capitalsService: CapitalsService, private router: Router) {
    this.newCapital = new NewCapital();
    this.clientsCapitals = [];
    this.clients = [];
    this.displayedColumns = [];
   }

  async ngOnInit(): Promise<void>{
    // await to get the list for paginator and sorting
    this.clientsCapitals = await this.getClientsCapitals();
    this.clientsService.getClients().subscribe(
      (data) => {
        this.clients = data.data;
      }
    )
    for (let c in this.clientsCapitals[0]) {
      if (!c.includes('newcapital')) {
        this.displayedColumns.push(c);
      }
    }
    this.dataSource = new MatTableDataSource(this.clientsCapitals);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageIndex = this.paginator.pageSize;
    console.log(this.clientsCapitals);
  }

  // get clients data to show on form
  private async getClientsCapitals(): Promise<any> {
    return new Promise(resolve => {
      let query: any[];
      this.clientsService.getClientsCapitals().subscribe(
        (data) => {
          query = data.data;
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          console.log('Petición realizada correctamente');
          resolve(query);
        }
      )
    })
  }

  // event and filter for the filtering
  public target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public async submit(value:any): Promise<void> {
      this.newCapital.newcapital_client = value.newcapital_client;
      this.newCapital.newcapital_quantity = value.newcapital_quantity;
      console.log(this.newCapital);

      this.capitalsService.newCapital(this.newCapital).subscribe(
        (data: any) => {
          this.router.navigate(['/ClientsCapitals']).then(() => {
            window.location.reload();
          });
        },
        (error: Error) => {
          console.error("Error al realizar el acceso");
        }
      )
  }

}
