import {Injectable} from 'angular2/core';
import {Player} from './Player';

@Injectable()
export class PlayersService {
  players: Player[];
  constructor() {
    if (localStorage.getItem('players')) {
      this.players = JSON.parse(localStorage.getItem('players'));
    } else {
      this.players = [];
      this.addPlayer(new Player('Claudi'));
      this.addPlayer(new Player('Chris'));
      this.addPlayer(new Player('Simon'));
    }
   }
  addPlayer(player) {
    if (player) {
      this.players.push(player);
    } else {
      var name: string = document.getElementById('nameInput').value || 'Name';
      document.getElementById('nameInput').value = '';
      this.players.push(new Player(name));
    }
    localStorage.setItem('players', JSON.stringify(this.players));
  }
  removePlayer(index) {
    this.players.splice(index, 1);
    localStorage.setItem('players', JSON.stringify(this.players));
  }
}