import { Record, List, Map } from 'immutable';
import { SET_ENTRIES, VOTE, NEXT } from './constants';

export type VOTING_SERVER_STATE = {
    entries?: List<string>;
    vote?: string;
    winner?: string;
    entry?: string;
    pair?: List<string>,
    tally?: Map<string, number>
}

export class VotingServerState extends Record({entries: undefined, vote: undefined, winner: undefined, entry: undefined, pair: undefined, tally: undefined} as VOTING_SERVER_STATE) {
    public toJS(): any {
        // Clear out undefined values
        return JSON.parse(JSON.stringify(super.toJS()));
    }
}

export const INITIAL_STATE = new VotingServerState();
