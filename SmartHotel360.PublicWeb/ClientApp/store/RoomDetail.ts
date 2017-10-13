import { fetch, addTask } from 'domain-task';
import { Reducer } from 'redux';
import { AppThunkAction } from 'ClientApp/store';
import { settings } from '../Settings';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface Service {
    id: number,
    name: string
}

interface IServicesDicionary {
    key: number
}

export const ServicesDictionary: { [index: number]: string } = {
    1: 'sh-wifi',
    2: '',
    3: '',
    4: 'sh-air-conditioning',
    5: '',
    6: '',
    7: '',
    8: 'sh-breakfast',
    9: '',
    10: '',
    11: 'sh-pool',
    12: '',
    13: 'sh-gym',
    14: '',
    15: '',
    16: '',
    17: 'sh-elevator'
};

export interface RoomDetail {
    defaultPicture: string,
    pictures: string[],
    description: string,
    name: string,
    rating: number,
    city: string,
    street: string,
    latitude: number,
    longitude: number,
    checkInTime: string,
    checkOutTime: string,
    pricePerNight: number,
    phone: string,
    services: Service[]
}

export enum Tabs {
    Hotel,
    Reviews
}

export enum Option {
    Hotel,
    Reviews
}

export interface RoomDetailState {
    tab: Tabs;
    room: RoomDetail;
    isBooking: boolean;
    booked: boolean;
    isLoading: boolean;
}

const initialState: RoomDetailState = {
    tab: Tabs.Hotel,
    room: {
        defaultPicture: '',
        pictures: [''],
        description: '',
        name: '',
        rating: 1,
        city: '',
        street: '',
        latitude: 0,
        longitude: 0,
        checkInTime: '',
        checkOutTime: '',
        pricePerNight: 0,
        phone: '',
        services: []
    },
    isBooking: false,
    booked: false,
    isLoading: false
};
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestRoomAction { type: 'REQUEST_ROOM_ACTION' }
interface ReceiveRoomAction { type: 'RECEIVE_ROOM_ACTION', room: RoomDetail }
interface SwitchTabAction { type: 'SWITCH_TAB_ACTION', tab: Tabs }
interface InitRoomDetailAction { type: 'INIT_ROOM_DETAIL_ACTION' }
interface BookRoomAction { type: 'BOOK_ROOM_ACTION' }
interface BookingRoomAction { type: 'BOOKING_ROOM_ACTION' }

type KnownAction = RequestRoomAction | ReceiveRoomAction | SwitchTabAction | InitRoomDetailAction | BookRoomAction | BookingRoomAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    init: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        //TODO: get initial data
        dispatch({ type: 'INIT_ROOM_DETAIL_ACTION' });
    },

    requestRoom: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`${settings.urls.hotels}Hotels/${id}`)
            .then(response => response.json() as Promise<RoomDetail>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ROOM_ACTION', room: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_ROOM_ACTION' });
    },

    switchTab: (tab: Tabs): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SWITCH_TAB_ACTION', tab: tab });
    },

    book: (tab: Tabs): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'BOOKING_ROOM_ACTION' });
        setTimeout(() => dispatch({ type: 'BOOK_ROOM_ACTION' }), 2000);
    }
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<RoomDetailState> = (state: RoomDetailState, action: KnownAction) => {
    switch (action.type) {        
        case 'INIT_ROOM_DETAIL_ACTION':
                return {...state };
        case 'REQUEST_ROOM_ACTION':
                return { ...state, isLoading: true };
        case 'RECEIVE_ROOM_ACTION':
                return { ...state, isLoading: false, room: action.room };
        case 'SWITCH_TAB_ACTION':
            return { ...state, tab: action.tab };
        case 'BOOKING_ROOM_ACTION':
            return { ...state, isBooking: true, booked: false };
        case 'BOOK_ROOM_ACTION':
            return { ...state, isBooking: false, booked: true };
        default:
            // the following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // for unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
}