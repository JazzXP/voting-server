import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/actions';
import { VotingServerState } from '../src/state';

describe('action logic', () => {
    describe('next', () => {
        it ('takes the next two entries under vote', () => {
            const state = new VotingServerState({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            expect(nextState.toJS()).to.deep.equal({
                vote: {
                    pair: ['Trainspotting', '28 Days Later']
                },
                entries: ['Sunshine']
            });
        });

        it ('puts winner of current vote back to entries', () => {
            const state = new VotingServerState({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState.toJS()).to.deep.equal({
                vote: {
                    pair: ['Sunshine', 'Millions']
                },
                entries: ['127 Hours', 'Trainspotting']
            });
        });

        it ('puts both from tied vote back to entries', () => {
            const state = new VotingServerState({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState.toJS()).to.deep.equal({
                vote: {
                    pair: ['Sunshine', 'Millions']
                },
                entries: ['127 Hours', 'Trainspotting', '28 Days Later']
            });
        });
    });
    
    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = new VotingServerState({
                pair: List.of('Trainspotting', '28 Days Later')
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState.toJS()).to.deep.equal({
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    'Trainspotting':1
                }
            });
        });

        it('adds to existing tally for the voted entry', () => {
            const state = new VotingServerState({
                pair: List.of('Trainspotting', '28 Days Later'),
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState.toJS()).to.deep.equal({
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    'Trainspotting': 1
                }
            });
        });
    });

    it ('marks winner when just one entry left', () => {
        const state = new VotingServerState({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                })
            }),
            entries: List<string>([])
        });
        
        const nextState = next(state);
        expect(nextState.toJS()).to.deep.equal({
            winner: 'Trainspotting'
        });
    });

});