import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Filter from './Filter';
import FilterPrice from './FilterPrice';
import FilterAvailability from './FilterAvailability';
import FilterRating from './FilterRating';
import FilterReviews from './FilterReviews';
import FilterServices from './FilterServices';
import FilterCancelation from './FilterCancelation';
import FilterNeighborhood from './FilterNeighborhood';
import FilterRelevance from './FilterRelevance';

export default class Filters extends React.Component<{}, {}> {
    public render() {
        return <div className='sh-filters'>
            <FilterAvailability />
            <FilterRating rating={3} />
            <Filter title= 'Price range' id='price'>
                <FilterPrice />
            </Filter>
            <Filter title='Reviews' id='reviews'>
                <FilterReviews />
            </Filter>
            <Filter title='Services' id='services'>
                <FilterServices />
            </Filter>
            <Filter title='Cancelation' id='cancelation'>
                <FilterCancelation />
            </Filter>
            <Filter title='Neighborhood' id='neighborhood' right={0}>
                <FilterNeighborhood />
            </Filter>
            <Filter title='Order by relevance' id='relevance' right={0}>
                <FilterRelevance />
            </Filter>
        </div>;
    }
}