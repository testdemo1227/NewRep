import { AppThunkAction } from 'ClientApp/store';
import { Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface Feature {
    title: string;
    imageUrl: string;
    description: string;
}

export interface FeaturesState {
    list?: Feature[];
}

const initialState: FeaturesState = {
    list: []
};

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestFeaturesAction { type: 'REQUEST_FEATURES_ACTION' }
interface ReceiveFeaturesAction { type: 'RECEIVE_FEATURES_ACTION', list: Feature[] }

type KnownAction = RequestFeaturesAction | ReceiveFeaturesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    request: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        // Static content
        const data = [
            {
                title: 'Book a smart conference room',
                imageUrl: '/assets/images/conference_room_1.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
            },
            {
                title: 'Smart room automatic adaptation',
                imageUrl: '/assets/images/conference_room_2.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
            },
            {
                title: 'Person recognition',
                imageUrl: '/assets/images/conference_room_3.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
            },
            {
                title: 'Personalize room',
                imageUrl: '/assets/images/conference_room_4.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
            }
        ];

        dispatch({ type: 'RECEIVE_FEATURES_ACTION', list: data });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<FeaturesState> = (state: FeaturesState, action: KnownAction) => {
    switch (action.type) {
        case 'REQUEST_FEATURES_ACTION':
            return { ...state };
        case 'RECEIVE_FEATURES_ACTION':
            return { ...state, list: action.list };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
};
