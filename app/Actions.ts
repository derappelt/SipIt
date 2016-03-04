import {Player} from './Player';

export function addPlayer(name: string) {
  let nameInputElement: HTMLInputElement = <HTMLInputElement>document.getElementById('nameInput');
  nameInputElement.value = '';
  return {
    type: 'ADD_PLAYER',
    player: new Player(name)
  }
}

export function removePlayer(id: number){
  return {
    type: 'REMOVE_PLAYER',
    id: id
  }
}

export function resetPlayersMultiplier(){
  return {
    type: 'RESET_PLAYERS_MULTIPLIER'
  }
}
