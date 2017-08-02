import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';
import { VotingServerState } from '../src/state';
import { SET_ENTRIES, NEXT, VOTE } from '../src/constants';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = new VotingServerState();
        const action = {type:SET_ENTRIES, entries:['Trainspotting']};
        const nextState = reducer(initialState, action);

        expect(nextState.toJS()).to.deep.equal({
            entries: ['Trainspotting']
        });
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = {type: NEXT};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair:['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it ('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = {type: VOTE, entry:'Trainspotting'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {'Trainspotting': 1}
            },
            entries: []
        }));
    });

    it ('has an initial state', () => {
        const action = {type: SET_ENTRIES, entries: ['Trainspotting']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.deep.equal(new VotingServerState({
            entries: List.of('Trainspotting')
        }));
    });

    it ('can be used with reduce', () => {
        const actions = [
            {type: SET_ENTRIES, entries: ['Trainspotting', '28 Days Later']},
            {type: NEXT},
            {type: VOTE, entry: 'Trainspotting'},
            {type: VOTE, entry: '28 Days Later'},
            {type: VOTE, entry: 'Trainspotting'},
            {type: NEXT}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Trainspotting'
        }));
    });
});