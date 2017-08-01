import { createStore, Store } from 'redux';
import {VotingServerState} from './core';
import reducer from './reducer';

export default function makeStore(): Store<VotingServerState> {
    return createStore(reducer) as Store<VotingServerState>;
}