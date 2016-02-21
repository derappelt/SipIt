import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Player} from './Player';
import {PlayersService} from './PlayersService';
import {SipItConfig} from './SipItConfig';
import {PlayersMenu} from './PlayersMenu';


@Component({
  selector: 'sipIt',
  directives: [PlayersMenu],
  templateUrl: 'app/SipIt.html'
})
export class SipIt implements SipItConfig{
  config : any;
  lastPlayer: Player;
  output: String;
  constructor(private playersService: PlayersService) {
    this.config = {
      minSips: 1,
      maxSips: 3,
      drinkOrDeal: "both"
    };
  }
  diceSips() {
    return Math.floor(Math.random() * (this.config.maxSips + 1 - this.config.minSips)) + this.config.minSips;
  }
  dicePlayer() {
    return this.playersService.players[Math.floor(Math.random() * this.playersService.players.length)];
  }
  rollTheDice(e) {
    if (e)
      e.preventDefault();
    var sips = this.diceSips();
    var player = this.dicePlayer();
    var drinkOrDeal = this.drinkOrDeal();
    if (this.lastPlayer === player) {
      player.multi++;
    } else {
      for (var i = 0; i < this.playersService.players.length; i++) {
        this.playersService.players[i].multi = 1;
      }
    }
    this.lastPlayer = player;
    this.output = this.generateOutput(player, drinkOrDeal, sips);
    var msg = new SpeechSynthesisUtterance(this.output.replace(' 1 ', ' ein '));
    window.speechSynthesis.speak(msg);
  }
  generateOutput(player, drinkOrDeal, sips): String {
    if (player.multi === 1) {
      if (sips === 1) {
        return `${player.name} ${drinkOrDeal} ${sips} Schluck!`;
      } else {
        return `${player.name} ${drinkOrDeal} ${sips} Schlücke!`;
      }
    } else {
      return `${player.name} ${drinkOrDeal} ${sips} mal ${player.multi} Schlücke wegen Multiplikator x${player.multi}`;
    }
  }
  drinkOrDeal(): String {
    var drinkOrDeal: String;
    if (this.config.drinkOrDeal === "both") {
      if (Math.floor(Math.random() * 2) === 0) {
        drinkOrDeal = `trinkt`;
      } else {
        drinkOrDeal = `verteilt`;
      }
    } else {
      drinkOrDeal = this.config.drinkOrDeal;
    }
    return drinkOrDeal;
  }
  openMenu(menu, open) {
    if (open === false) {
      document.querySelector('.' + menu + 'Menu').style.display = 'none';
    } else {
      document.querySelector('.' + menu + 'Menu').style.display = 'block';
    }
  }
  configUpdate(){
    this.config.minSips = parseInt(`${this.config.minSips}`);
    this.config.maxSips = parseInt(`${this.config.maxSips}`);
  }
}

bootstrap(SipIt, [PlayersService]);