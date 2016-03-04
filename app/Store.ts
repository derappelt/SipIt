import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

function playerReducer(state:Object[] = [], action) {
  switch (action.type) {
    case 'ADD_PLAYER':
      return [...state, action.player];
    default:
    return state
  }
}

let rootReducer = combineReducers({players: playerReducer});

export const store = createStore(rootReducer, window.devToolsExtension ? window.devToolsExtension() : undefined);
