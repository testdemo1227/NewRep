import * as WeatherForecasts from './WeatherForecasts';
import * as NavMenu from './NavMenu';
import * as Counter from './Counter';
import * as User from './User';
import { RouterState } from 'react-router-redux';

// The top-level state object
export interface ApplicationState {
    nav: NavMenu.NavMenuState;
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    user: User.UserState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    nav: NavMenu.reducer,
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    user: User.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
