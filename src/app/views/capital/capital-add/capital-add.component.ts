import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientsService } from 'src/app/shared/services/client/clients.service';
import { NewCapital } from 'src/app/shared/classes/newcapital/newcapital';
import { CapitalsService } from 'src/app/shared/services/capital/capitals.service';

@Component({
  selector: 'app-capital-add',
  templateUrl: './capital-add.component.html',
  styleUrls: ['./capital-add.component.css']
})
export class CapitalAddComponent implements OnInit {
  public newCapital: NewCapital;
  public clients: Array<any>;

  constructor(private clientsService: ClientsService, private capitalsService: CapitalsService, private router: Router) {
    this.newCapital = new NewCapital();
    this.clients = [];
  }

  ngOnInit(): void {
    this.clientsService.getClients().subscribe(
      (data) => {
        this.clients = data.data;
      }
    )
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
