import {Component} from 'angular2/core';
import {PlayersService} from './PlayersService';

@Component({
  selector: 'playersMenu',
  templateUrl: 'app/PlayersMenu.html'
})

export class PlayersMenu {
  constructor(public playersService: PlayersService) { }
  close(){
    document.querySelector('.playersMenu').style.display = 'none';
  }
}