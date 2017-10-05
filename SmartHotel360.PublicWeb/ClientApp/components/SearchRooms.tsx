import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Filters from './Filters';
import Rooms from './Rooms';
import Room from './Room';

type SearchRoomsProps =
    RouteComponentProps<{}>;

export default class SearchRooms extends React.Component<SearchRoomsProps, {}> {
    public render() {
        return <div className='sh-search_rooms'>
            <Filters />
            <Rooms component={Room} title='Smart Rooms'/>
        </div>;
    }
}