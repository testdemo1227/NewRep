import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NavMenu } from './components/NavMenu';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';

export const routes = <Layout>
    <div>
        <Route component={NavMenu} />
    </div>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
</Layout>;
