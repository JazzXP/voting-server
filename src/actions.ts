import { List, Map } from 'immutable';
import { SET_ENTRIES, VOTE, NEXT } from './constants';
import { VOTING_SERVER_STATE, VotingServerState } from './state';

type _VOTING_SEVER_ACTION = {
    type: SET_ENTRIES | VOTE | NEXT | '';
}

export type VOTING_SERVER_ACTION = _VOTING_SEVER_ACTION & VOTING_SERVER_STATE;

export function setEntriesAction(entries: List<string>): VOTING_SERVER_ACTION {
    return {
        type: SET_ENTRIES,
        entries
    };
}

export function voteAction(entry?: string): VOTING_SERVER_ACTION {
    return {
        type: VOTE,
        entry
    }
}

export function nextAction(): VOTING_SERVER_ACTION {
    return {
        type: NEXT
    }
}

export function setEntries(state: VotingServerState, entries: List<string> | Array<string>) {
    return state.set('entries', List(entries));
}

function getWinners(vote: VotingServerState): List<string> {
    if (!vote) return List<string>([]);
    const [a,b] = vote.get('pair').toJS();
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return List<string>([a]);
    else if (aVotes < bVotes) return List<string>([b]);
    else return List<string>([a,b]);
}

export function next(state: VotingServerState): VotingServerState {
    const entries: List<string> = state.get('entries')
                                        .concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote')
                    .remove('entries')
                    .set('winner', entries.first());
    }
    else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });    
    }
}

export function vote(voteState: VotingServerState, entry: string): VotingServerState {
    let tempVoteState = voteState;
    if (voteState.get('tally') == undefined) // change default to a map for below, not ideal, but due to being a "Record" and having defaults rather than a "Map" and being blank
        tempVoteState = voteState.set('tally', Map());
    return tempVoteState.updateIn(
        ['tally', entry],
        0,
        (tally: number) => tally + 1
    );
}