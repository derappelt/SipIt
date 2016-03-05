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

export function setLastPlayer(name: string){
  return {
    type: 'SET_LAST_PLAYER',
    name: name
  }
}

export function resetLastPlayerMulti(){
  return {
    type: 'RESET_LAST_PLAYER_MULTI'
  }
}

export function incrementLastPlayerMulti(){
  return {
    type: 'INCREMENT_LAST_PLAYER_MULTI'
  }
}

export function setOutput(output: string){
  return {
    type: 'SET_OUTPUT',
    output: output
  }
}
