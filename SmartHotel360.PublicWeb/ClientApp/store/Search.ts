import { Reducer } from 'redux';
import * as moment from 'moment';
import { AppThunkAction } from 'ClientApp/store';
import { settings } from '../Settings';
import { fetch, addTask } from 'domain-task';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export enum Option {
    Where,
    When,
    Guests,
    People
}

export enum Tab {
    Smart,
    Conference
}

interface Input<T> {
    value: T;
    list?: T[];
    isLoading: boolean;
}

export class City {
    constructor(
        public name?: string,
        public country?: string) {}
    
    public get fullname(): string {
        return this.name ? `${this.name}, ${this.country}` : '';
    }
}

export class Guests {
    constructor(
        public adults?: number,
        public kids?: number,
        public baby?: number,
        public rooms?: number,
        public work?: boolean) { }
}

export class Dates {
    constructor(
        public startDate?: moment.Moment,
        public endDate?: moment.Moment,
        public isFilled = false) { }

    public get fulldate(): string {
        return this.startDate ? `${this.startDate}, ${this.endDate}` : '';
    }
}

export interface SearchState {
    tab: Tab;
    shouldRender: boolean;
    minLength: number;
    selected: Option;
    where: Input<City>;
    when: Input<Dates>;
    guests: Input<Guests>;
}

const initialState: SearchState = {
    tab: Tab.Smart,
    shouldRender: false,
    minLength: 3,
    selected: Option.Where,
    where: {
        value: new City(),
        list: [],
        isLoading: false
    },
    when: {
        value: new Dates(),
        isLoading: false
    },
    guests: {
        value: new Guests(2, 0, 0, 1, false),
        isLoading: false
    }
};

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface InitAction { type: 'INIT_ACTION' }
interface RequestWhereAction { type: 'REQUEST_WHERE_ACTION' }
interface ReceiveWhereAction { type: 'RECEIVE_WHERE_ACTION', list: City[] }
interface SelectWhereAction  { type: 'SELECT_WHERE_ACTION', city: City }
interface ResetWhereAction   { type: 'RESET_WHERE_ACTION' }
interface SelectWhenAction { type: 'SELECT_WHEN_ACTION', next: Option, start: moment.Moment, end: moment.Moment }
interface SelectGuestsAction { type: 'SELECT_GUESTS_ACTION', adults: number, kids: number, baby: number, rooms: number, work: boolean }
interface SwitchTabAction { type: 'SWITCH_TAB_ACTION', tab: Tab }


type KnownAction = InitAction | RequestWhereAction | ReceiveWhereAction | SelectWhereAction | ResetWhereAction | SelectWhenAction | SelectGuestsAction | SwitchTabAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {

    init: (value: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'INIT_ACTION'});
    },
    searchWhere: (value: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const state = getState().search;

        if (value.length < state.minLength) {
            dispatch({ type: 'RECEIVE_WHERE_ACTION', list: [] });
            return;
        }

        let fetchTask = fetch(`${settings.urls.hotels}Cities?name=${value}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                data = data.map((item: any) => {
                    return new City(item.name, item.country);
                });
                dispatch({ type: 'RECEIVE_WHERE_ACTION', list: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_WHERE_ACTION' });
    },

    selectWhere: (city: City): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SELECT_WHERE_ACTION', city: city });
    },

    resetWhere: (city: City): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'RESET_WHERE_ACTION'});
    },

    selectWhenStart: (date: moment.Moment): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const end = getState().search.when.value.endDate;
        dispatch({ type: 'SELECT_WHEN_ACTION', next: Option.When, start: date, end: (end || moment()) });
    },

    selectWhenEnd: (date: moment.Moment): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const state = getState().search;
        const start = state.when.value.startDate;
        dispatch({ type: 'SELECT_WHEN_ACTION', next: state.tab === Tab.Smart ? Option.Guests : Option.People, start: (start || moment()), end: date });
    },

    updateGuestsAdults: (value: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const guests = getState().search.guests.value;
        dispatch({ type: 'SELECT_GUESTS_ACTION', adults: value, kids: guests.kids || 0, baby: guests.baby || 0, rooms: guests.rooms || 0, work: guests.work || false });
    },

    updateGuestsKids: (value: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const guests = getState().search.guests.value;
        dispatch({ type: 'SELECT_GUESTS_ACTION', adults: guests.adults || 0, kids: value, baby: guests.baby || 0, rooms: guests.rooms || 0, work: guests.work || false });
    },

    updateGuestsBaby: (value: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const guests = getState().search.guests.value;
        dispatch({ type: 'SELECT_GUESTS_ACTION', adults: guests.adults || 0, kids: guests.kids || 0, baby: value, rooms: guests.rooms || 0, work: guests.work || false});
    },

    updateGuestsRooms: (value: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const guests = getState().search.guests.value;
        dispatch({ type: 'SELECT_GUESTS_ACTION', adults: guests.adults || 0, kids: guests.kids || 0, baby: guests.baby || 0, rooms: value, work: guests.work || false });
    },

    updateGuestsWork: (value: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const guests = getState().search.guests.value;
        dispatch({ type: 'SELECT_GUESTS_ACTION', adults: guests.adults || 0, kids: guests.kids || 0, baby: guests.baby || 0, rooms: guests.rooms || 0, work: value });
    },

    switchTab: (tab: Tab): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SWITCH_TAB_ACTION', tab: tab });
    }
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<SearchState> = (state: SearchState, action: KnownAction) => {
    switch (action.type) {
        case 'INIT_ACTION': 
            return { ...state, shouldRender: true, when: { ...state.when, value: new Dates(moment().add(7, 'days'), moment().add(10, 'days') ) } };
        case 'REQUEST_WHERE_ACTION':
            return { ...state, where: { ...state.where, isLoading: true } };
        case 'RECEIVE_WHERE_ACTION':
            return { ...state, where: { ...state.where, isLoading: false, list: action.list } };
        case 'SELECT_WHERE_ACTION':
            return { ...state, selected: Option.When, where: { ...state.where, value: action.city } };
        case 'RESET_WHERE_ACTION':
            return { ...state, selected: Option.Where, where: { ...state.where, value: new City(), list: [] } };
        case 'SELECT_WHEN_ACTION':
            return { ...state, selected: action.next, when: { ...state.when, value: new Dates(action.start, action.end, true) } };
        case 'SELECT_GUESTS_ACTION':
            return { ...state, guests: { ...state.guests, value: new Guests(action.adults, action.kids, action.baby, action.rooms, action.work) } };
        case 'SWITCH_TAB_ACTION':
            return { ...state, tab: action.tab, selected: action.tab === Tab.Smart ? Option.Guests : Option.People };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
};