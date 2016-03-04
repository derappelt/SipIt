import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {Player} from './Player';

let defaultPlayers = JSON.parse(localStorage.getItem('players')) || [new Player('Claudi'), new Player('Chris'), new Player('Simon')];

function playerReducer(state:Object[] = defaultPlayers , action) {
  switch (action.type) {
    case 'ADD_PLAYER':
      return [...state, action.player];
    case 'REMOVE_PLAYER':
      return [...state.slice(0, action.id),...state.slice(action.id+1)]
    case 'INCREMENT_PLAYER_MULTI':
      return [...state.slice(0, action.id), Object.assign({}, state[action.id], {multi: state[action.id].multi++}), ...state.slice(action.id+1)]
    case 'RESET_PLAYERS_MULTIPLIER':
      return [...state].map((player: Player)=> player.multi = 1);
    default:
    return state
  }
}

let rootReducer = combineReducers({players: playerReducer});

export const store = createStore(rootReducer, window.devToolsExtension ? window.devToolsExtension() : undefined);
