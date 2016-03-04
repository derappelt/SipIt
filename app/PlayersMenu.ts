import {Component, Inject} from 'angular2/core';
import {Store} from 'redux';
import {addPlayer, removePlayer} from './Actions';

@Component({
  selector: 'playersMenu',
  templateUrl: 'app/PlayersMenu.html'
})

export class PlayersMenu {
  addPlayer = addPlayer;
  removePlayer = removePlayer;
  constructor(@Inject('Store') private store: Store) {
  }
  close(){
    let playersMenuElement = <HTMLElement>document.querySelector('playersMenu');
    playersMenuElement.style.display = 'none';
  }
}
