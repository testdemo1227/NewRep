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

export class Booking {
    constructor(public hotelId: number,
        public userId: string,
        public from: string,
        public to: string,
        public adults: number | 0,
        public kids: number | 0,
        public babies: number | 0,
        public roomType: number | 0,
        public price: number | 0) { }
}

export const ServicesDictionary: { [index: number]: string } = {
    1: 'sh-wifi',
    2: 'sh-parking',
    3: 'sh-tv',
    4: 'sh-air-conditioning',
    5: 'sh-dryer',
    6: 'sh-indoor-fireplace',
    7: 'sh-table',
    8: 'sh-breakfast',
    9: '',
    10: 'sh-airport-shutle',
    11: 'sh-pool',
    12: 'sh-fitness-centre',
    13: 'sh-gym',
    14: 'sh-hot-tub',
    15: '',
    16: 'sh-wheelchair-accessible',
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
    room: RoomDetail;
    isLoading: boolean;
    isBooking: boolean;
    booked: boolean
}

const initialState: RoomDetailState = {
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
    isLoading: false,
    isBooking: false,
    booked: false
};
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestRoomAction { type: 'REQUEST_ROOM_ACTION' }
interface ReceiveRoomAction { type: 'RECEIVE_ROOM_ACTION', room: RoomDetail }
interface InitRoomDetailAction { type: 'INIT_ROOM_DETAIL_ACTION' }
interface BookRoomAction { type: 'BOOK_ROOM_ACTION', booked: boolean }
interface BookingRoomAction { type: 'BOOKING_ROOM_ACTION' }

type KnownAction = RequestRoomAction | ReceiveRoomAction | InitRoomDetailAction | BookRoomAction | BookingRoomAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    init: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
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

    book: (booking: Booking, token: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
                
        let fetchTask = fetch(`${settings.urls.bookings}Bookings`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(response => {
            dispatch({ type: 'BOOK_ROOM_ACTION', booked: true });
        }, (e) => {
            dispatch({ type: 'BOOK_ROOM_ACTION', booked: false });
        });

        dispatch({ type: 'BOOKING_ROOM_ACTION' });
    }
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<RoomDetailState> = (state: RoomDetailState, action: KnownAction) => {
    switch (action.type) {
        case 'INIT_ROOM_DETAIL_ACTION':
            return { ...state, isBooking: false, booked: false };
        case 'REQUEST_ROOM_ACTION':
            return { ...state, isLoading: true };
        case 'RECEIVE_ROOM_ACTION':
            return { ...state, isLoading: false, room: action.room };
        case 'BOOKING_ROOM_ACTION':
            return { ...state, isBooking: true, booked: false };
        case 'BOOK_ROOM_ACTION':
            return { ...state, isBooking: false, booked: action.booked };
        default:
            // the following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // for unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
}