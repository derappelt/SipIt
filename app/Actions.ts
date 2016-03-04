import {Player} from './Player';

export function addPlayerREDUX(name: string) {
  return {
    type: 'ADD_PLAYER',
    player: new Player(name)
  }
}
