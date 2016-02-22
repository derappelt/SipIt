import {Component, Inject} from 'angular2/core';
import {ConfigService} from './ConfigService';

@Component({
  selector: 'configMenu',
  templateUrl: 'app/ConfigMenu.html'
})

export class ConfigMenu {

  constructor(@Inject(ConfigService) private configService:ConfigService) { }
  close(){
    document.querySelector('.settingsMenu').style.display = 'none';
  }
}