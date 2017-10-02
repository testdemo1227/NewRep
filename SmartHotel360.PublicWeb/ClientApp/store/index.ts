import * as WeatherForecasts from './WeatherForecasts';
import * as NavMenu from './NavMenu';
import * as Counter from './Counter';
import * as Rooms from './Rooms';
import * as User from './User';
import * as ConferenceRoomsFeatures from './ConferenceRoomsFeatures';

// the top-level state object
export interface ApplicationState {
    nav: NavMenu.NavMenuState;
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    rooms: Rooms.RoomsState;
    user: User.UserState;
    conferenceRoomsFeatures: ConferenceRoomsFeatures.FeaturesState;
}

// whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    nav: NavMenu.reducer,
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    rooms: Rooms.reducer,
    user: User.reducer,
    conferenceRoomsFeatures: ConferenceRoomsFeatures.reducer
};

// this type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
