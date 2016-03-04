///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="./speech.d.ts"/>

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

export class SipIt {
  lastPlayer: Player;
  output: string;
  autoPlayInterval: number;
  autoPlay: string = 'play';

  constructor( @Inject(PlayersService) private playersService: PlayersService, @Inject(ConfigService) private configService: ConfigService) {
    document.addEventListener('keyup', (e) => this.keyup(e));
    // Rx.Observable.fromEvent(document, 'keyup')
    //   .filter((e) => e.keyCode === 32)
  }
  diceSips(): number {
    return Math.floor(Math.random() * (this.configService.maxSips + 1 - this.configService.minSips)) + this.configService.minSips;
  }
  dicePlayer(): Player {
    return this.playersService.players[Math.floor(Math.random() * this.playersService.players.length)];
  }
  rollTheDice(e?: Event): void {
    if (this.autoPlay === 'pause')
      this.startAutoPlayInterval();
    if (e)
      e.preventDefault();
    let sips = this.diceSips();
    let player = this.dicePlayer();
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
  generateOutput(player: Player, drinkOrDeal: string, sips:number): string {
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
  speechOutput(msg: string): void{
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg.replace(' 1 ', ' ein ')));
  }
  drinkOrDeal(): string{
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
  toggleAutoPlay(): void{
    if (this.autoPlay === 'play') {
      this.startAutoPlayInterval();
      this.autoPlay = 'pause';
    } else {
      clearInterval(this.autoPlayInterval);
      this.autoPlay = 'play';
    }
  }
  startAutoPlayInterval(): void{
    clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = setInterval(() => { this.rollTheDice(); }, this.configService.autoPlayTime);
  }
  autoPlayTimeUpdate(): void{
    if (this.autoPlay === 'pause') {
      this.startAutoPlayInterval();
    }
    this.configService.update();
  }
  keyup(e: KeyboardEvent): void{
    if (e.keyCode === 32) {
      this.rollTheDice();
    }
  }
  openMenu(selector: string, open: boolean):void {
    let menuElement = <HTMLElement>document.querySelector(selector);
    if (open === false) {
      menuElement.style.display = 'none';
    } else {
      menuElement.style.display = 'block';
    }
  }
}

bootstrap(SipIt, [PlayersService, ConfigService]);
