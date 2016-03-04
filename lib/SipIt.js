"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var redux_1 = require('redux');
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var rxjs_1 = require('rxjs');
var PlayersService_1 = require('./PlayersService');
var ConfigService_1 = require('./ConfigService');
var PlayersMenu_1 = require('./PlayersMenu');
var ConfigMenu_1 = require('./ConfigMenu');
var SipIt = (function () {
    function SipIt(playersService, configService) {
        var _this = this;
        this.playersService = playersService;
        this.configService = configService;
        this.autoPlay = 'play';
        rxjs_1.Observable.fromEvent(document, 'keyup')
            .filter(function (e) { return e.keyCode === 32; })
            .subscribe(function () { return _this.rollTheDice(); });
    }
    SipIt.prototype.diceSips = function () {
        return Math.floor(Math.random() * (this.configService.maxSips + 1 - this.configService.minSips)) + this.configService.minSips;
    };
    SipIt.prototype.dicePlayer = function () {
        return this.playersService.players[Math.floor(Math.random() * this.playersService.players.length)];
    };
    SipIt.prototype.rollTheDice = function (e) {
        if (this.autoPlay === 'pause')
            this.startAutoPlayInterval();
        if (e)
            e.preventDefault();
        var sips = this.diceSips();
        var player = this.dicePlayer();
        var drinkOrDeal = this.drinkOrDeal();
        if (this.lastPlayer === player) {
            player.multi++;
        }
        else {
            for (var i = 0; i < this.playersService.players.length; i++) {
                this.playersService.players[i].multi = 1;
            }
        }
        this.lastPlayer = player;
        this.output = this.generateOutput(player, drinkOrDeal, sips);
        this.speechOutput(this.output);
    };
    SipIt.prototype.generateOutput = function (player, drinkOrDeal, sips) {
        if (player.multi === 1) {
            if (sips === 1) {
                return player.name + " " + drinkOrDeal + " " + sips + " Schluck!";
            }
            else {
                return player.name + " " + drinkOrDeal + " " + sips + " Schl\u00FCcke!";
            }
        }
        else {
            return player.name + " " + drinkOrDeal + " " + sips + " mal " + player.multi + " Schl\u00FCcke wegen Multiplikator x" + player.multi;
        }
    };
    SipIt.prototype.speechOutput = function (msg) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg.replace(' 1 ', ' ein ')));
    };
    SipIt.prototype.drinkOrDeal = function () {
        var drinkOrDeal;
        if (this.configService.drinkOrDeal === "both") {
            if (Math.floor(Math.random() * 2) === 0) {
                drinkOrDeal = "trinkt";
            }
            else {
                drinkOrDeal = "verteilt";
            }
        }
        else {
            drinkOrDeal = this.configService.drinkOrDeal;
        }
        return drinkOrDeal;
    };
    SipIt.prototype.toggleAutoPlay = function () {
        if (this.autoPlay === 'play') {
            this.startAutoPlayInterval();
            this.autoPlay = 'pause';
        }
        else {
            clearInterval(this.autoPlayInterval);
            this.autoPlay = 'play';
        }
    };
    SipIt.prototype.startAutoPlayInterval = function () {
        var _this = this;
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = setInterval(function () { _this.rollTheDice(); }, this.configService.autoPlayTime);
    };
    SipIt.prototype.autoPlayTimeUpdate = function () {
        if (this.autoPlay === 'pause') {
            this.startAutoPlayInterval();
        }
        this.configService.update();
    };
    SipIt.prototype.openMenu = function (selector, open) {
        var menuElement = document.querySelector(selector);
        if (open === false) {
            menuElement.style.display = 'none';
        }
        else {
            menuElement.style.display = 'block';
        }
    };
    SipIt = __decorate([
        core_1.Component({
            selector: 'sipIt',
            directives: [PlayersMenu_1.PlayersMenu, ConfigMenu_1.ConfigMenu],
            templateUrl: 'app/SipIt.html'
        }),
        __param(0, core_1.Inject(PlayersService_1.PlayersService)),
        __param(1, core_1.Inject(ConfigService_1.ConfigService)), 
        __metadata('design:paramtypes', [PlayersService_1.PlayersService, ConfigService_1.ConfigService])
    ], SipIt);
    return SipIt;
}());
exports.SipIt = SipIt;
function rootReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        default:
            return state;
    }
}
var store = redux_1.createStore(rootReducer, [], window.devToolsExtension ? window.devToolsExtension() : undefined);
browser_1.bootstrap(SipIt, [PlayersService_1.PlayersService, ConfigService_1.ConfigService, core_1.provide('Store', { useValue: store })]);
//# sourceMappingURL=SipIt.js.map