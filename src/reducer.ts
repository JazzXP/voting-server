import { SET_ENTRIES, VOTE, NEXT } from './constants';
import { INITIAL_STATE, VotingServerState } from './state';
import { setEntries, next, vote } from './actions';
import { SetEntriesAction, VoteAction, NextAction, OtherAction } from './action_types';
import { fromJS } from 'immutable';

type AllActions = 
    SetEntriesAction |
    VoteAction |
    NextAction |
    OtherAction;

export default function reducer(state: VotingServerState = INITIAL_STATE, action: AllActions): VotingServerState {
    let newState: VotingServerState = fromJS(state);
    switch(action.type) {
        case SET_ENTRIES:
            return setEntries(newState, action.entries);
        case NEXT:
            return next(newState);
        case VOTE:
            return newState.update('vote', 
                        (voteState: VotingServerState) => vote(voteState, action.entry));
    }
    return newState;
}