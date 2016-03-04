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
var core_1 = require('angular2/core');
var Player_1 = require('./Player');
var PlayersService = (function () {
    function PlayersService() {
        if (localStorage.getItem('players')) {
            this.players = JSON.parse(localStorage.getItem('players'));
        }
        else {
            this.players = [];
            this.addPlayer(new Player_1.Player('Claudi'));
            this.addPlayer(new Player_1.Player('Chris'));
            this.addPlayer(new Player_1.Player('Simon'));
        }
    }
    PlayersService.prototype.addPlayer = function (player) {
        if (player) {
            this.players.push(player);
        }
        else {
            var nameInputElement = document.getElementById('nameInput');
            var name = nameInputElement.value || 'Name';
            nameInputElement.value = '';
            this.players.push(new Player_1.Player(name));
        }
        localStorage.setItem('players', JSON.stringify(this.players));
    };
    PlayersService.prototype.removePlayer = function (index) {
        this.players.splice(index, 1);
        localStorage.setItem('players', JSON.stringify(this.players));
    };
    PlayersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlayersService);
    return PlayersService;
}());
exports.PlayersService = PlayersService;
