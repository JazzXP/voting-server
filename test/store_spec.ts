import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { VotingServerState } from '../src/state';
import makeStore from '../src/store';

describe('store', () => {
    it ('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.deep.equal(new VotingServerState());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Trainspotting', '28 Days Later']
        });

        expect(store.getState()).to.deep.equal(new VotingServerState({
            entries: List.of('Trainspotting', '28 Days Later')
        }));
    });
});