import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SearchStore from '../store/Search';

type SearchInfoProps =
    SearchStore.SearchState
    & typeof SearchStore.actionCreators;

class SearchInfo extends React.Component<SearchInfoProps, {}> {
    public didComponentMount() {
    }

    private renderGuestsOrPeople() {
        if (this.props.tab === SearchStore.Tab.Smart) {
            return (<li className='sh-search-group'>
                {this.props.guests.value.full}
            </li>);
        }

        if (this.props.tab === SearchStore.Tab.Conference) {
            return (<li className='sh-search-group'>
                {this.props.guests.value.full}
            </li>);
        }
    }

    public render(): JSX.Element {
        return <div className='sh-search sh-search--info'>
            <div className='sh-search-wrapper'>
                <ul className='sh-search-inputs'>
                    <li className='sh-search-group'>
                        {this.props.where.value.full}
                    </li>

                    <li className='sh-search-group'>
                        {this.props.when.value.full}
                    </li>

                    {this.renderGuestsOrPeople()}

                </ul>
            </div>
        </div>;
    }

}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.search, // selects which state properties are merged into the component's props
    SearchStore.actionCreators                 // selects which action creators are merged into the component's props
)(SearchInfo) as any;