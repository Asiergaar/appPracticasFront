import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientsService } from 'src/app/shared/services/client/clients.service';
import { NewCapital } from 'src/app/shared/classes/newcapital/newcapital';
import { CapitalsService } from 'src/app/shared/services/capital/capitals.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-capital-add',
  templateUrl: './capital-add.component.html',
  styleUrls: ['./capital-add.component.css']
})
export class CapitalAddComponent implements OnInit {
  public newCapital: NewCapital;
  public clients: Array<any>;

  constructor(
    private clientsService: ClientsService,
    private capitalsService: CapitalsService,
    private utils: UtilsService,
    private router: Router
  ) {
    this.newCapital = new NewCapital();
    this.clients = [];
  }

  ngOnInit(): void {
    // Gets clients data
    this.clientsService.getClients().subscribe(
      (data: any) => { this.clients = data.data; }
    )
    this.utils.menuHover('menuclient');
  }

  // Takes data from form and add new capital to database
  public async submit(value:any): Promise<void> {
      this.newCapital.newcapital_client = value.newcapital_client;
      this.newCapital.newcapital_quantity = value.newcapital_quantity;

      this.capitalsService.newCapital(this.newCapital).subscribe(
        (data: any)    => { this.router.navigate(['/clientsCapitals']).then(() => { window.location.reload(); }); },
        (error: Error) => { console.error("Error al realizar el acceso"); this.router.navigate([ '/serverError'], { queryParams: { page: window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.length ) } } );}
      )
  }

}
