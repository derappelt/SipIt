import {Component, Inject} from 'angular2/core';
import {ConfigService} from './ConfigService';
import { Store } from 'redux';

@Component({
  selector: 'configMenu',
  templateUrl: 'app/ConfigMenu.html'
})

export class ConfigMenu {

  constructor(@Inject(ConfigService) private configService: ConfigService, @Inject('Store') private store: Store) {
    console.log(store.getState());
  }
  close(){
    let configMenuElement=<HTMLElement>document.querySelector('configMenu');
    configMenuElement.style.display = 'none';
  }
}
