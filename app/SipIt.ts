///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/window.d.ts"/>
declare var require: any

import {bootstrap} from 'angular2/platform/browser';
import {Component, Inject, provide} from 'angular2/core';
import {createStore, Store} from 'redux';
import {rootReducer} from './Store';
import {Observable} from 'rxjs';
import {Player} from './Player';
import {ConfigService} from './ConfigService';
import {PlayersMenu} from './PlayersMenu';
import {ConfigMenu} from './ConfigMenu';
import {resetPlayersMultiplier, setLastPlayer, resetLastPlayerMulti, incrementLastPlayerMulti, setOutput} from './Actions';

const store = createStore(rootReducer, window.devToolsExtension ? window.devToolsExtension() : undefined);

@Component({
  selector: 'sipit',
  directives: [PlayersMenu, ConfigMenu],
  template: require('html!./SipIt.html')
})

export class SipIt {
  players: Player[];
  autoPlayInterval: number;
  autoPlay: string = 'play';

  constructor(@Inject(ConfigService) private configService: ConfigService, @Inject('Store') private store: Store) {
    Observable.fromEvent(document, 'keyup')
      .filter((e:KeyboardEvent) => e.keyCode === 32)
      .subscribe(()=>this.rollTheDice());
    this.players = store.getState().players;
    store.subscribe(()=> {
      this.players = store.getState().players;
      document.getElementById('output').innerHTML = store.getState().output;
      localStorage.setItem('players', JSON.stringify(store.getState().players));
    });
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
    if (store.getState().lastPlayer.name === player.name) {
      store.dispatch(incrementLastPlayerMulti());
    } else {
      store.dispatch(resetLastPlayerMulti());
    }
    store.dispatch(setLastPlayer(player.name));
    let output = this.generateOutput(player, drinkOrDeal, sips);
    store.dispatch(setOutput(output));
    this.speechOutput(output);
  }
  generateOutput(player: Player, drinkOrDeal: string, sips:number): string {
    if (store.getState().lastPlayer.multi === 1) {
      if (sips === 1) {
        return `${player.name} ${drinkOrDeal} ${sips} Schluck!`;
      } else {
        return `${player.name} ${drinkOrDeal} ${sips} Schlücke!`;
      }
    } else {
      return `${player.name} ${drinkOrDeal} ${sips} mal ${store.getState().lastPlayer.multi} Schlücke wegen Multiplikator x${store.getState().lastPlayer.multi}`;
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
