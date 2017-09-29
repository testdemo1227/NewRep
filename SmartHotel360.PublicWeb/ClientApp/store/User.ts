/// <reference path="../../node_modules/msal/out/msal.d.ts" />

import { AppThunkAction } from 'ClientApp/store';
import { Reducer } from 'redux';

// TODO: Env variables
const tenant = 'smarthotel360.onmicrosoft.com';
const policy = 'B2C_1_SignUpInPolicy';
const client = 'b3cfbe11-ac36-4dcb-af16-8656ee286dcc';
const scopes = ['openid'];
const authority = `https://login.microsoftonline.com/tfp/${tenant}/${policy}`;

let userManager: Msal.UserAgentApplication;

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface UserState {
    name?: string | null;
    id?: string | null;
    error?: boolean;
}

const initialState: UserState = {
    name: null,
    id: null,
    error: false
};

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface InitAction { type: 'INIT_ACTION', name: string | null, id: string | null }
interface LoginAction { type: 'LOGIN_ACTION', error: boolean }
interface LogoutAction { type: 'LOGOUT_ACTION' }

type KnownAction = InitAction | LoginAction | LogoutAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    init: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        userManager = new Msal.UserAgentApplication(client, authority,
        (errorDesc: any, token: any, error: any, tokenType: any) => {
            console.log('after loginredirect or acquireTokenPopup');
        });

        setTimeout(() => {
            userManager.acquireTokenSilent(scopes)
            .then((accessToken: any) => {
                const user = userManager.getUser();
                dispatch({ type: 'INIT_ACTION', name: user.name, id: user.userIdentifier });
            }, (error: any) => {
                dispatch({ type: 'INIT_ACTION', name: null, id: null });
            });
        }, 10);
    },

    login: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        userManager.acquireTokenSilent(scopes)
            .then((accessToken: any) => {
                dispatch({ type: 'LOGIN_ACTION', error: false });
            }, (error: any) => {
                userManager.loginRedirect(scopes);
                dispatch({ type: 'LOGIN_ACTION', error: true});
            });
    },
    logout: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'LOGOUT_ACTION'});
        userManager.logout();
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<UserState> = (state: UserState, action: KnownAction) => {
    switch (action.type) {
        case 'INIT_ACTION':
            return { ...state, error: false, name: action.name, id: action.id };
        case 'LOGIN_ACTION':
            return { ...state, error: action.error };
        case 'LOGOUT_ACTION':
            return { ...state, error: false };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ...initialState };
};
