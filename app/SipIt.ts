///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/window.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {Component, Inject, provide} from 'angular2/core';
import {store} from './Store';
import {Observable} from 'rxjs';
import {Player} from './Player';
import {ConfigService} from './ConfigService';
import {PlayersMenu} from './PlayersMenu';
import {ConfigMenu} from './ConfigMenu';
import {resetPlayersMultiplier} from './Actions';

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

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    Observable.fromEvent(document, 'keyup')
      .filter((e:KeyboardEvent) => e.keyCode === 32)
      .subscribe(()=>this.rollTheDice());
  }
  diceSips(): number {
    return Math.floor(Math.random() * (this.configService.maxSips + 1 - this.configService.minSips)) + this.configService.minSips;
  }
  dicePlayer(): Player {
    return store.getState().players[Math.floor(Math.random() * store.getState().players.length)];
  }
  rollTheDice(e?: Event): void {
    if (this.autoPlay === 'pause')
      this.startAutoPlayInterval();
    if (e)
      e.preventDefault();
    let sips = this.diceSips();
    let player = this.dicePlayer();
    var drinkOrDeal = this.drinkOrDeal();
    if (this.lastPlayer.name === player) {
      player.multi++;
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
  openMenu(selector: string, open: boolean):void {
    let menuElement = <HTMLElement>document.querySelector(selector);
    if (open === false) {
      menuElement.style.display = 'none';
    } else {
      menuElement.style.display = 'block';
    }
  }
}

bootstrap(SipIt, [ConfigService, provide('Store', { useValue: store })]);
