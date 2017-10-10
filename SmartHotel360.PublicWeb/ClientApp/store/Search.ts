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

export enum Guest {
    Adults,
    Kids,
    Babies
}

interface Input<T> {
    value: T;
    list: T[];
}

export class City {
    constructor(
        public id?: number,
        public name?: string,
        public country?: string) {}
    
    public get full(): string {
        return this.name ? `${this.name}, ${this.country}` : '';
    }
}

export class Guests {
    constructor(
        public adults: number,
        public kids: number,
        public baby: number,
        public rooms: number,
        public work?: boolean,
        public isFilled = false) { }

    private setRoomLabel(): string {
        return this.rooms > 1 ? `${this.rooms} Rooms` : `${this.rooms} Room`;
    }

    private setGuestsLabel(): string {
        return (this.adults + this.kids + this.baby) > 1 ? `${this.adults + this.kids + this.baby} Guests` : `${this.adults + this.kids + this.baby} Guest`;
    }

    public get full(): string {
        return this.isFilled ? `${this.setGuestsLabel()}, ${this.setRoomLabel()}` : '';
    }
}

export class People {
    constructor(
        public total: number) { }

    public get full(): string {
        return this.total ? `${this.total} People` : '';
    }
}

export class Dates {
    constructor(
        public startDate?: moment.Moment,
        public endDate?: moment.Moment,
        public isFilled = false) { }

    public get full(): string {
        return this.startDate && this.endDate ? `${this.startDate.format('DD MMM')} - ${this.endDate.format('DD MMM')}` : '';
    }
}

export interface SearchState {
    tab: Tab;
    started: boolean,
    isLoading: boolean;
    shouldRender: boolean;
    minLength: number;
    selected: Option;
    where: Input<City>;
    when: Input<Dates>;
    guests: Input<Guests>;
    people: Input<People>;
}

const initialState: SearchState = {
    tab: Tab.Smart,
    started: false,
    shouldRender: false,
    minLength: 3,
    selected: Option.Where,
    isLoading: false,
    where: {
        value: new City(),
        list: []
    },
    when: {
        value: new Dates(),
        list: []
    },
    guests: {
        value: new Guests(1, 0, 0, 1, false, false),
        list: []
    },
    people: {
        value: new People(1),
        list: []
    }
};

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface InitAction { type: 'INIT_ACTION' }
interface RequestWhereAction { type: 'REQUEST_WHERE_ACTION' }
interface ReceiveWhereAction { type: 'RECEIVE_WHERE_ACTION', list: City[], started: boolean }
interface SelectWhereAction  { type: 'SELECT_WHERE_ACTION', city: City }
interface ResetWhereAction   { type: 'RESET_WHERE_ACTION' }
interface ResetWhenAction { type: 'RESET_WHEN_ACTION' }
interface ResetGuestsAction { type: 'RESET_GUESTS_ACTION' }
interface ResetPeopleAction { type: 'RESET_PEOPLE_ACTION' }
interface SelectWhenAction { type: 'SELECT_WHEN_ACTION', next: Option, start: moment.Moment, end: moment.Moment }
interface SelectGuestsAction { type: 'SELECT_GUESTS_ACTION', adults: number, kids: number, baby: number, rooms: number, work: boolean }
interface SelectPepopleAction { type: 'SELECT_PEOPLE_ACTION', total: number }
interface SwitchTabAction { type: 'SWITCH_TAB_ACTION', tab: Tab }


type KnownAction = InitAction | RequestWhereAction | ReceiveWhereAction | SelectWhereAction | ResetWhereAction | SelectWhenAction | SelectGuestsAction | SwitchTabAction | SelectPepopleAction | ResetWhenAction | ResetGuestsAction | ResetPeopleAction;

// ---------------
// FUNCTIONS - Our functions to reuse in this code.
function checkNextTabOnSwitch(currentTab: Tab, selectedOption: Option) {
    if (selectedOption === Option.Where || selectedOption === Option.When) {
        return selectedOption;
    }

    return currentTab === Tab.Smart ? Option.Guests : Option.People;
}

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {

    init: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'INIT_ACTION'});
    },
    searchWhere: (value: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const state = getState().search;

        if (value.length < state.minLength) {
            dispatch({ type: 'RECEIVE_WHERE_ACTION', list: [], started: false });
            return;
        }

        dispatch({ type: 'RECEIVE_WHERE_ACTION', list: [], started: true });

        let fetchTask = fetch(`${settings.urls.hotels}Cities?name=${value}`)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                data = data.map((item: any) => {
                    return new City(item.id, item.name, item.country);
                });
                dispatch({ type: 'RECEIVE_WHERE_ACTION', list: data, started: true });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_WHERE_ACTION' });
    },

    selectWhere: (city: City): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SELECT_WHERE_ACTION', city: city });
    },

    resetWhere: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'RESET_WHERE_ACTION'});
    },

    resetWhen: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'RESET_WHEN_ACTION' });
    },

    resetGuests: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'RESET_GUESTS_ACTION' });
    },

    resetPeople: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'RESET_PEOPLE_ACTION' });
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

    updatePeople: (value: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SELECT_PEOPLE_ACTION', total: value || 0 });
    },

    switchTab: (tab: Tab): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SWITCH_TAB_ACTION', tab: tab });
    }
};


// ----------------
// rEDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<SearchState> = (state: SearchState, action: KnownAction) => {
    switch (action.type) {
        case 'INIT_ACTION': 
            return { ...state, shouldRender: true, when: { ...state.when, value: new Dates(moment().add(7, 'days'), moment().add(8, 'days') ) } };
        case 'REQUEST_WHERE_ACTION':
            return { ...state, isLoading: true };
        case 'RECEIVE_WHERE_ACTION':
            return { ...state, started: action.started, isLoading: false, where: { ...state.where, list: action.list } };
        case 'SELECT_WHERE_ACTION':
            return { ...state, selected: Option.When, where: { ...state.where, value: action.city } };
        case 'RESET_WHERE_ACTION':
            return { ...state, started: false, selected: Option.Where, where: { ...state.where, value: new City(), list: [] } };
        case 'SELECT_WHEN_ACTION':
            return { ...state, selected: action.next, when: { ...state.when, value: new Dates(action.start, action.end, true) } };
        case 'RESET_WHEN_ACTION':
            return { ...state, selected: Option.When, when: { ...state.when, value: new Dates(moment().add(7, 'days'), moment().add(8, 'days'), false)} };
        case 'SELECT_GUESTS_ACTION':
            return { ...state, guests: { ...state.guests, value: new Guests(action.adults, action.kids, action.baby, action.rooms, action.work, true) } };
        case 'RESET_GUESTS_ACTION':
            return { ...state, selected: Option.Guests, guests: { ...state.guests, value: new Guests(1, 0, 0, 1, false, false) } };
        case 'RESET_PEOPLE_ACTION':
            return { ...state, selected: Option.Guests, people: { ...state.people, value: new People(1) } };
        case 'SELECT_PEOPLE_ACTION':
            return { ...state, people: { ...state.people, value: new People(action.total) } };
        case 'SWITCH_TAB_ACTION':
            return { ...state, tab: action.tab, selected: checkNextTabOnSwitch(action.tab, state.selected) };
        default:
            // the following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // for unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
};
