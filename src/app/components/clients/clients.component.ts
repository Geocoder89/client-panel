import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/Clients';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;
  constructor(private clientservice: ClientsService) {}

  ngOnInit(): void {
    this.clientservice.getClients().subscribe((clients) => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  // tslint:disable-next-line: typedef
  getTotalOwed() {
    // tslint:disable-next-line: no-shadowed-variable
    const total = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);

    this.totalOwed = total;
  }
}
