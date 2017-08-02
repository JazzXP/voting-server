import * as CONSTANTS from './constants';
import { Map, List } from 'immutable'

export type SetEntriesAction = {
    type: CONSTANTS.SET_ENTRIES,
    entries: List<string> | Array<string>
}

export type VoteAction = {
    type: CONSTANTS.VOTE,
    entry: string
}

export type NextAction = {
    type: CONSTANTS.NEXT
}

export type OtherAction = {
    type: '';
}

export const OtherAction: OtherAction = { type: '' }