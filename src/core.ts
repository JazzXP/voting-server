import {Record, List, Map} from 'immutable';
import {SET_ENTRIES, VOTE, NEXT} from './constants';

export type VOTE_SERVER_STATE = {
    pair?: List<string>,
    tally?: Map<string, number>
}

export type VOTING_SERVER_STATE = {
    type: SET_ENTRIES | VOTE | NEXT | '';
    entries?: List<string>;
    vote?: VOTE_SERVER_STATE
    winner?: string;
    entry?: string;
}

export class VotingServerState extends Record({type: '', entries: undefined, vote: undefined, winner: undefined, entry: undefined} as VOTE_SERVER_STATE) {}

export function setEntriesAction(entries: List<string>): VOTING_SERVER_STATE {
    return {
        type: SET_ENTRIES,
        entries
    };
}

export function voteAction(entry?: string): VOTING_SERVER_STATE {
    return {
        type: VOTE,
        entry
    }
}

export function nextAction(): VOTING_SERVER_STATE {
    return {
        type: NEXT
    }
}

export const INITIAL_STATE = new VotingServerState();

export function setEntries(state: VotingServerState, entries: List<string>) {
    return state.set('entries', List(entries));
}

function getWinners(vote: VotingServerState): List<string> {
    if (!vote) return List<string>([]);
    const [a,b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return List<string>([a]);
    else if (aVotes < bVotes) return List<string>([b]);
    else return List<string>([a,b]);
}

export function next(state: VotingServerState): VotingServerState {
    const entries: any = state.get('entries')
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
    return voteState.updateIn(
        ['tally', entry],
        0,
        (tally: any) => tally + 1
    );
}