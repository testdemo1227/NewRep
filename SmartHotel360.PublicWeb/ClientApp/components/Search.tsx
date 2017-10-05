import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SearchStore from '../store/Search';

type SearchProps =
    SearchStore.SearchState
    & typeof SearchStore.actionCreators;

// TODO: remove any
class Search extends React.Component<any, {}> {
    public didComponentMount() {
        // Because this plugin doesn't accept SSR
        this.props.init();
    }

    private onClickTab = (tab: SearchStore.Tab) => {
        this.props.switchTab(tab);
    }

    private onChangeWhere = (e: React.KeyboardEvent<HTMLInputElement>) => {
        this.props.searchWhere(e.currentTarget.value);
    }

    private onClickWhere = () => {
        this.props.resetWhere();
        let input: any = this.refs.whereinput;
        input.value = '';
        setTimeout(() => input.focus(), 10);
    }

    private renderOptionWhere(): JSX.Element {
        return (<ul>
            {this.props.where.list.map((city: SearchStore.City, key: number) =>
                <div className='sh-search-option' key={key} onClick={() => this.props.selectWhere(city)}>
                    {city.fullname}
                </div>
            )}
        </ul>);
    }

    private renderGuestsOrPeople() {
        if (this.props.tab === SearchStore.Tab.Smart) {
            return (<li className='sh-search-group'>
                <input className='sh-search-input'
                    type='text'
                    ref='guestsinput'
                    placeholder='Guests' />
            </li>);
        }

        if (this.props.tab === SearchStore.Tab.Conference) {
            return (<li className='sh-search-group'>
                
                <input className='sh-search-input'
                    type='text'
                    ref='peopleinput'
                    placeholder='People' />
            </li>);
        }
    }

    private onClickWhen = () => {
        //this.props.resetWhen();
        console.log('IMPLEMENT')
        let input: any = this.refs.wheninput;
        input.value = '';
        setTimeout(() => input.focus(), 10);
    }

    private onChangeWhenStart = (date: moment.Moment) => {
        this.props.selectWhenStart(date);
    }

    private onChangeWhenEnd = (date: moment.Moment) => {
        this.props.selectWhenEnd(date);
    }

    private renderOptionWhen(): JSX.Element {
        // SSR not supported
        const DatePicker: any = (require('react-datepicker') as any).default;
        return (<div>
            <DatePicker
                selected={this.props.when.value.startDate}
                selectsStart
                inline
                startDate={this.props.when.value.startDate}
                endDate={this.props.when.value.endDate}
                onChange={this.onChangeWhenStart}
            />

            <DatePicker
                selected={this.props.when.value.endDate}
                selectsEnd
                inline
                startDate={this.props.when.value.startDate}
                endDate={this.props.when.value.endDate}
                onChange={this.onChangeWhenEnd}
            />
        </div>);
    }

    private onClickGuests = () => {
        //this.props.resetWhen();
        console.log('IMPLEMENT guests')
        let input: any = this.refs.guestsinput;
        input.value = '';
        setTimeout(() => input.focus(), 10);
    }

    // TODO Improve this types and styles
    private onChangeGuestsAdults = (e: any) => {
        this.props.updateGuestsAdults(e.currentTarget.value);
    }

    private onChangeGuestsKids = (e: any) => {
        this.props.updateGuestsKids(e.currentTarget.value);
    }

    private onChangeGuestsBaby = (e: any) => {
        this.props.updateGuestsBaby(e.currentTarget.value);
    }

    private onChangeGuestsRooms = (e: any) => {
        this.props.updateGuestsRooms(e.currentTarget.value);
    }

    private onChangeGuestsWork = (e: any) => {
        this.props.updateGuestsWork(e.currentTarget.value);
    }

    private renderOptionGuests(): JSX.Element {
        return (<div className='sh-guests'>
            <section className='sh-guests-config'>
                <div className='sh-guests-people'>
                    <input type='number' value={this.props.guests.value.adults} onChange={this.onChangeGuestsAdults} />
                    <input type='number' value={this.props.guests.value.kids} onChange={this.onChangeGuestsKids} />
                    <input type='number' value={this.props.guests.value.baby} onChange={this.onChangeGuestsBaby} />
                </div>
                <div className='sh-guests-rooms'>
                    <input type='text' value={this.props.guests.value.rooms} onChange={this.onChangeGuestsRooms} />
                </div>
            </section>
            <section className='sh-guests-extra'>
                <input type='checkbox' value={this.props.guests.value.work} onChange={this.onChangeGuestsWork} />
            </section>
        </div>);
    }

    private renderOptionPeople(): JSX.Element {
        return (<div className='sh-guests sh-guests--people'>
            <section className='sh-guests-config'>
                <div className='sh-guests-people'>
                    <input type='number' value={this.props.guests.value.people}  />
                </div>
            </section>
        </div>);
    }

    private renderCurrentOption(): JSX.Element {
        debugger
        switch (this.props.selected) {
            case SearchStore.Option.Where:
                return this.renderOptionWhere();
            case SearchStore.Option.When:
                if (this.props.shouldRender) {
                    return this.renderOptionWhen();
                }
            case SearchStore.Option.Guests:
                return this.renderOptionGuests();
            case SearchStore.Option.People:
                return this.renderOptionPeople();
            default:
                return (<div></div>);
        }
    }

    public render(): JSX.Element {
        return <div className='sh-search'>
            <div className='sh-search-wrapper'>
                <ul className='sh-search-tabs'>
                    <li className={'sh-search-tab ' + (this.props.tab === SearchStore.Tab.Smart ? 'is-active' : '')}
                        onClick={() => this.onClickTab(SearchStore.Tab.Smart)}>
                        Smart Room
                    </li>
                    <li className={'sh-search-tab ' + (this.props.tab === SearchStore.Tab.Conference ? 'is-active' : '')}
                        onClick={() => this.onClickTab(SearchStore.Tab.Conference)}>
                        Conference Room
                   </li>
                </ul>
                <ul className='sh-search-inputs'>
                    <li className='sh-search-group'>
                        <div className={'sh-search-value ' + (this.props.where.value.fullname ? 'is-filled' : '')}
                            onClick={this.onClickWhere}>
                            {this.props.where.value.fullname}
                        </div>
                        <input className={'sh-search-input ' + (!this.props.where.value.fullname ? '' : 'is-hidden')}
                            type='text'
                            ref='whereinput'
                            onKeyUp={this.onChangeWhere}
                            placeholder='Where' />
                    </li>

                    <li className='sh-search-group'>
                        <div className={'sh-search-value ' + (this.props.when.value.isFilled ? 'is-filled' : '')}
                            onClick={this.onClickWhen}>
                            {this.props.when.value.fulldate}
                        </div>
                        <input className={'sh-search-input ' + (!this.props.when.value.isFilled ? '' : 'is-hidden')}
                                type='text'
                                ref='wheninput'
                                placeholder='When' />
                    </li>

                    {this.renderGuestsOrPeople()}

                    <li className='sh-search-group'>
                        <input className='sh-search-button' type='button' disabled={!this.props.where.value.fullname && !this.props.when.value.isFilled} value='Find a Room' />
                    </li>

                </ul>
                <section className='sh-search-Option'>
                    {this.renderCurrentOption()}
                </section>
            </div>
        </div>;
    }

}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.search, // Selects which state properties are merged into the component's props
    SearchStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Search) as typeof Search;