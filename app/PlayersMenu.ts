import {Component, Inject, Input} from 'angular2/core';
import {Store} from 'redux';
import {addPlayer, removePlayer} from './Actions';
import {Player} from './Player';

@Component({
  selector: 'playersMenu',
  templateUrl: 'app/PlayersMenu.html',
})

export class PlayersMenu {
  @Input() players: Player[];
  addPlayer = addPlayer;
  removePlayer = removePlayer;
  constructor(@Inject('Store') private store: Store) {
  }
  close(){
    let playersMenuElement = <HTMLElement>document.querySelector('playersMenu');
    playersMenuElement.style.display = 'none';
  }
}
