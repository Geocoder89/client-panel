import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Clients';
import { ClientsService } from 'src/app/services/clients.service';
import { SettingsService } from 'src/app/services/settings.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;
  constructor(
    private flashMessages: FlashMessagesService,
    private clientService: ClientsService,
    private router: Router,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settings.getSettings().disableBalanceOnAdd;
  }

  // tslint:disable-next-line: typedef
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    // set client balance to 0
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      // show error
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // Add new client
      this.clientService.newClient(value);
      // show message

      this.flashMessages.show('New Client added', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
