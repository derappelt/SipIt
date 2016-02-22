import {Component, Inject} from 'angular2/core';
import {PlayersService} from './PlayersService';

@Component({
  selector: 'playersMenu',
  templateUrl: 'app/PlayersMenu.html'
})

export class PlayersMenu {
  constructor(@Inject(PlayersService) private playersService:PlayersService) { }
  close(){
    document.querySelector('.playersMenu').style.display = 'none';
  }
}