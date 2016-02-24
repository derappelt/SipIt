///<reference path="node_modules/angular2/typings/browser.d.ts"/> 

import {bootstrap} from 'angular2/platform/browser';
import {Component, Inject} from 'angular2/core';
import {Player} from './Player';
import {PlayersService} from './PlayersService';
import {ConfigService} from './ConfigService';
import {PlayersMenu} from './PlayersMenu';
import {ConfigMenu} from './ConfigMenu';

@Component({
  selector: 'sipIt',
  directives: [PlayersMenu, ConfigMenu],
  templateUrl: 'app/SipIt.html'
})
export class SipIt{
  lastPlayer: Player;
  output: string;
  constructor(@Inject(PlayersService) private playersService: PlayersService, @Inject(ConfigService) private configService: ConfigService) {
    document.addEventListener('keyup',(e) => this.keyup(e));
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
    this.speechOutput(this.output);
  }
  generateOutput(player, drinkOrDeal, sips): string {
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
  speechOutput(msg: string){
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg.replace(' 1 ', ' ein ')));
  }
  drinkOrDeal(): string {
    var drinkOrDeal: string;
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
  keyup(e){
    if (e.keyCode === 32) {
      this.rollTheDice();
    }
  }
  openMenu(menu, open) {
    if (open === false) {
      document.querySelector(menu + 'menu').style.display = 'none';
    } else {
      document.querySelector(menu + 'menu').style.display = 'block';
    }
  }
}

bootstrap(SipIt, [PlayersService, ConfigService]);
