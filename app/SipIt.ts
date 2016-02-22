import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Player} from './Player';
import {PlayersService} from './PlayersService';
import {ConfigService} from './ConfigService';
import {PlayersMenu} from './PlayersMenu';


@Component({
  selector: 'sipIt',
  directives: [PlayersMenu],
  templateUrl: 'app/SipIt.html'
})
export class SipIt{
  lastPlayer: Player;
  output: String;
  constructor(private playersService: PlayersService, private configService: ConfigService) {
  }
  diceSips() {
    return Math.floor(Math.random() * (this.configService.maxSips + 1 - this.configService.minSips)) + this.configService.minSips;
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
    if (this.configService.drinkOrDeal === "both") {
      if (Math.floor(Math.random() * 2) === 0) {
        drinkOrDeal = `trinkt`;
      } else {
        drinkOrDeal = `verteilt`;
      }
    } else {
      drinkOrDeal = this.configService.drinkOrDeal;
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
}

bootstrap(SipIt, [PlayersService, ConfigService]);