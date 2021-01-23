import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Clients';
import { SettingsService } from 'src/app/services/settings.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnEdit: boolean;
  constructor(
    private clientService: ClientsService,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    // set the edit  value on  init

    this.disableBalanceOnEdit = this.settings.getSettings().disableBalanceOnEdit;
    // Get id from url

    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // add id to client
      value.id = this.id;
      // update the client

      this.clientService.updateClient(value);
      // show flash message

      this.flashMessages.show('Client has been successfully updated', {
        cssClass: 'alert-success',
        timeout: 4000,
      });

      // redirect to dashboard
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
