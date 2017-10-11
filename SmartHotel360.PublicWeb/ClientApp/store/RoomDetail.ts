import { Reducer } from 'redux';
import { AppThunkAction } from 'ClientApp/store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RoomDetail {
    image: string,
    description: string,
    name: string,
    stars: number,
    location: string,
    country: string,
    price: string
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
    isLoading: boolean;
    room: RoomDetail;
}

const initialState: RoomDetailState = {
    tab: Tabs.Hotel,
    isLoading: false,
    room: {
        image: '/assets/images/room_detail.png',
        description: `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit. Sed ut tortor ut dui egestas semper eu a mauris.
Duis at tincidunt justo. Integer quis gravida mi.
Sed sed malesuada mauris. Aenean eu rutrum ipsum, ut venenatis quam.
Donec dignissim, nulla ut imperdiet lobortis, dolor augue interdum velit, nec rutrum ex justo nec massa.
Cras lobortis elit massa, a aliquam neque blandit ac.
Proin placerat ligula in lacus pulvinar, molestie convallis massa luctus.
Quisque turpis justo, varius eu nibh elementum, pellentesque finibus quam.
Quisque id ipsum et ligula convallis blandit id sed libero.
Proin aliquet mollis ipsum sed condimentum.
Pellentesque ornare mi ac dolor venenatis consequat. Etiam tempor at metus nec elementum.
Curabitur ut suscipit arcu. Vivamus ipsum nisl, scelerisque a varius et, tincidunt a diam.
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
        name: 'Smart Union Hotel',
        stars: 4,
        location: 'St. Unioninkatu, 416',
        country: '',
        price: '$588'
    }
};
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface SwitchTabAction { type: 'SWITCH_TAB_ACTION', tab: Tabs }
interface InitRoomDetailAction { type: 'INIT_ROOM_DETAIL_ACTION' }

type KnownAction = SwitchTabAction | InitRoomDetailAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    init: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        //TODO: get initial data
        dispatch({ type: 'INIT_ROOM_DETAIL_ACTION' });
    },

    switchTab: (tab: Tabs): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SWITCH_TAB_ACTION', tab: tab });
    }
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<RoomDetailState> = (state: RoomDetailState, action: KnownAction) => {
    switch (action.type) {        
        case 'INIT_ROOM_DETAIL_ACTION':
                return {...state };        
        case 'SWITCH_TAB_ACTION':
            return { ...state, tab: action.tab };
        default:
            // the following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // for unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
}