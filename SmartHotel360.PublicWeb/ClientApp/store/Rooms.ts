import { AppThunkAction } from 'ClientApp/store';
import { Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface Room {
    image: string;
    title: string;
    rating: number;
    city: string;
    price: number;
    currency: string;
    type: string;
}

export interface RoomsState {
    list?: Room[];
    isLoading: boolean;
}

const initialState: RoomsState = {
    list: [],
    isLoading: false
};

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestRoomsAction { type: 'REQUEST_ROOMS_ACTION' }
interface ReceiveRoomsAction { type: 'RECEIVE_ROOMS_ACTION', list: Room[] }

type KnownAction = RequestRoomsAction | ReceiveRoomsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    request: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // TODO: Use api
        setTimeout(() => {
            const data = [
                {
                    image: '/assets/images/hotel_1.png',
                    title: 'Lorem Ipsum',
                    rating: 3,
                    city: 'Stockholm, Sweden',
                    price: 130,
                    currency: '$',
                    type: 'Book a room'
                },
                {
                    image: '/assets/images/hotel_2.png',
                    title: 'Lorem Ipsum',
                    rating: 3,
                    city: 'Stockholm, Sweden',
                    price: 130,
                    currency: '$',
                    type: 'Book a room'
                },
                {
                    image: '/assets/images/hotel_3.png',
                    title: 'Lorem Ipsum',
                    rating: 3,
                    city: 'Stockholm, Sweden',
                    price: 130,
                    currency: '$',
                    type: 'Book a conference room'
                }
            ];
 
            dispatch({ type: 'RECEIVE_ROOMS_ACTION', list: data });
        }, 1000);
        dispatch({ type: 'REQUEST_ROOMS_ACTION'});
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<RoomsState> = (state: RoomsState, action: KnownAction) => {
    switch (action.type) {
        case 'REQUEST_ROOMS_ACTION':
            return { ...state, isLoading: true };
        case 'RECEIVE_ROOMS_ACTION':
            return { ...state, isLoading: false, list: action.list };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
};
