import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import NavMenu from './components/NavMenu';
import SearchRooms from './components/SearchRooms';
import RoomDetail from './components/RoomDetail';

export const routes = <Layout>
    <Route component={NavMenu} />
    <Route exact path='/' component={Home} />
    <Route exact path='/home2' component={Home} />
    <Route exact path='/SearchRooms' component={SearchRooms} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/RoomDetail/:hotelId' component={RoomDetail} />
</Layout>;
