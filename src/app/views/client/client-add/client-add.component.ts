import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from 'src/app/shared/classes/client/client';
import { ClientsService } from 'src/app/shared/services/client/clients.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  public client: Client;

  constructor(private clientsService: ClientsService, private router: Router) {
    this.client = new Client();
   }

  ngOnInit(): void {
  }

  public submit(): void {
    this.clientsService.addClient(this.client).subscribe(
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
