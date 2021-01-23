import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/Settings';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false,
  };
  constructor(
    private settingServices: SettingsService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.settings = this.settingServices.getSettings();
  }

  toggleRegistration() {
    this.settings.allowRegistration = !this.settings.allowRegistration;
  }
  toggleDisableBalanceOnAdd() {
    this.settings.disableBalanceOnAdd = !this.settings.disableBalanceOnAdd;
  }

  toggleDisableBalanceOnEdit() {
    this.settings.disableBalanceOnEdit = !this.settings.disableBalanceOnEdit;
  }

  onSubmit() {
    this.settingServices.changeSettings(this.settings);
    this.flashMessages.show('Settings saved', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
