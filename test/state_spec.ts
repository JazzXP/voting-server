import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries } from '../src/actions';
import { VotingServerState } from '../src/state';

describe('state logic', () => {
    describe('setEntries', () => {
        it ('adds the entries to the state', () => {
            const state = new VotingServerState();
            const entries = List.of('Trainspotting', '28 Days Later');
            const nextState = setEntries(state, entries);
            expect(nextState.toJS()).to.deep.equal({
                entries: ['Trainspotting', '28 Days Later']
            });
        });
        it('converts to immutable', () => {
            const state = new VotingServerState();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.deep.equal(new VotingServerState({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });
});