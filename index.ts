import makeStore from './src/store';
import startServer from './src/server';
import {VotingServerState} from './src/core'
import {Store} from 'redux';

export const store: Store<VotingServerState> = makeStore();
startServer(store);

store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
});

store.dispatch({type: 'NEXT'});