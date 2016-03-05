import {combineReducers } from 'redux';
import {Player} from './Player';

let defaultPlayers : Player[] = JSON.parse(localStorage.getItem('players')) || [new Player('Claudi'), new Player('Chris'), new Player('Simon')];
let defaultLastPlayer : {name: string, multi: number} = {name: undefined, multi: 1};

function playerReducer(state:Object[] = defaultPlayers , action:{type: string, player: Player, id: number}) {
  switch (action.type) {
    case 'ADD_PLAYER':
      return [...state, action.player];
    case 'REMOVE_PLAYER':
      return [...state.slice(0, action.id),...state.slice(action.id+1)];
    default:
      return state;
  }
}
function lastPlayerReducer(state:{name: string, multi: number} = defaultLastPlayer , action:{type: string, name: string}){
  switch (action.type) {
    case 'SET_LAST_PLAYER':
      return {name: action.name, multi: state.multi};
    case 'RESET_LAST_PLAYER_MULTI':
      return {name: state.name, multi: 1};
    case 'INCREMENT_LAST_PLAYER_MULTI':
      return {name: state.name, multi: (state.multi + 1)};
    default:
      return state;
  }
}
function outputReducer(state:string = "Roll the Dice", action:{type: string, output: string}){
  switch (action.type) {
    case 'SET_OUTPUT':
      return action.output;
    default:
      return state;
  }
}

export let rootReducer = combineReducers({players: playerReducer, lastPlayer: lastPlayerReducer, output: outputReducer});
