import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Clients';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientsService,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get id from url

    this.id = this.route.snapshot.params.id;
    // get client
    this.clientService.getClient(this.id).subscribe((client) => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  // tslint:disable-next-line: typedef
  onDeleteClick() {
    if (confirm('Are you sure you want to delete this client')) {
      this.clientService.deleteClient(this.client);
      this.flashMessages.show('client removed', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }

  // tslint:disable-next-line: typedef
  toogleBalanceUpdate() {
    this.showBalanceUpdateInput = !this.showBalanceUpdateInput;
    // console.log('toggle is working');
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessages.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
    this.router.navigate(['/']);
  }
}
