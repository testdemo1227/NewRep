import { Action, Reducer } from 'redux';

export interface NavMenuState {
    history: any;
}

interface GetHistoryAction { type: 'GET_HISTORY' }

export const actionCreators = {
    getHistory: () => <GetHistoryAction>{ type: 'GET_HISTORY' }
};

export function setHistory(history: any) {
    return {
        type: "SET_HISTORY",
        payload: {
            history
        }
    }
}

export const reducer: Reducer<NavMenuState> = (state: NavMenuState, action: any) => {
    switch (action.type) {
        case 'SET_HISTORY':
            return { history: action.payload } as NavMenuState;
        case 'GET_HISTORY':
            return state;
    }
    return state || { history: '/' };
};