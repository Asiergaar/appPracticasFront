export class Client {
  public client_id: number;
  public client_name: string;
  public client_surname: string;
  public entry_date: Date;
  public email: string;
  public start_capital: number;
  public pools_started: boolean;

  constructor() {
    this.client_name = '';
    this.client_surname = '';
    this.email = '';
  }
}
