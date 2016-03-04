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
      this.addPlayer('Claudi');
      this.addPlayer('Chris');
      this.addPlayer('Simon');
    }
   }
  addPlayer(name?: string): void {
    if (name) {
      this.players.push(new Player(name));
    } else {
      let nameInputElement: HTMLInputElement = <HTMLInputElement>document.getElementById('nameInput');
      var name: string = nameInputElement.value || 'Name';
      nameInputElement.value = '';
      this.players.push(new Player(name));
    }
    localStorage.setItem('players', JSON.stringify(this.players));
  }
  removePlayer(index:number): void {
    this.players.splice(index, 1);
    localStorage.setItem('players', JSON.stringify(this.players));
  }
}
