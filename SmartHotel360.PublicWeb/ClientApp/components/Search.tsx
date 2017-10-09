import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as SearchStore from '../store/Search';
import * as $ from 'jquery';
import IncrementDecrement from './IncrementDecrement';

type SearchProps =
    SearchStore.SearchState
    & typeof SearchStore.actionCreators;

type guestsType = 'adults' | 'kids' | 'babies';

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
                    {city.full}
                </div>
            )}
        </ul>);
    }

    private renderGuestsOrPeople() {
        if (this.props.tab === SearchStore.Tab.Smart) {
            return (<li className='sh-search-group'>
                <div className={'sh-search-value ' + (this.props.guests.value.isFilled ? 'is-filled' : '')}
                    onClick={this.onClickGuests}>
                    {this.props.guests.value.full}
                </div>
                <input className={'sh-search-input ' + (!this.props.guests.value.isFilled ? '' : 'is-hidden')}
                    type='text'
                    ref='guestsinput'
                    onClick={this.onClickGuests}
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
        this.props.resetWhen();
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
        return (<div className='sh-search-when'>
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
        this.props.resetGuests();
        let input: any = this.refs.guestsinput;
        input.value = '';
        setTimeout(() => input.focus(), 10);
    }

    private checkNumber(n: string): boolean {
        return !n || parseFloat(n) === Number(n);
    }

    // TODO Improve this types and styles
    private onChangeGuestsAdults = (e: any) => {
        const value = e.currentTarget.value;
        if (!this.checkNumber(value)) {
            return;
        }
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

    private onChangeGuestsWork = (isForWork: boolean) => {
        this.props.updateGuestsWork(isForWork);
    }

    private onChangePeople = (e: any) => {
        this.props.updatePeople(e.currentTarget.value);
    }

    private removeGuest = (type: guestsType) => {        
        switch (type) {
            case 'adults':
                let adults = this.props.guests.value.adults - 1;
                if (adults) {
                    this.props.updateGuestsAdults(adults);
                }
                break;
            case 'kids':
                let kids = this.props.guests.value.kids - 1;
                if (kids >= 0) {
                    this.props.updateGuestsKids(kids);
                }
                break;
            default:
                let babies = this.props.guests.value.baby - 1;
                if (babies >= 0) {
                    this.props.updateGuestsBaby(babies);
                }
                break;
        }
    }

    private addGuest = (type: guestsType) => {
        switch (type) {
            case 'adults':
                let adults = this.props.guests.value.adults + 1;
                this.props.updateGuestsAdults(adults);
                break;
            case 'kids':
                let kids = this.props.guests.value.kids + 1;
                this.props.updateGuestsKids(kids);
                break;
            default:
                let babies = this.props.guests.value.baby + 1;
                this.props.updateGuestsBaby(babies);
                break;
        }
    }

    private addRoom = () => {
        let rooms = this.props.guests.value.rooms + 1;
        this.props.updateGuestsRooms(rooms);
    }

    private removeRoom = () => {
        if (!this.props.guests.value.rooms) {
            return;
        }
        let rooms = this.props.guests.value.rooms - 1;
        this.props.updateGuestsRooms(rooms);
    }

    private selectOneRoom = () => {
        this.props.updateGuestsRooms(1);
    }

    public componentWillUpdate(nextProps: any): void {        
        if (nextProps.guests.value.rooms !== this.props.guests.value.rooms) {
            $('.sh-guests-room').removeClass('is-active');
            if (nextProps.guests.value.rooms === 1) {
                $('#oneRoomBox').addClass('is-active');
            } else if (nextProps.guests.value.rooms === 2) {
                $('#twoRoomBox').addClass('is-active');
            }
        }
    }

    private renderOptionGuests(): JSX.Element {
        return (<div className='sh-guests'>
            <section className='sh-guests-config'>
                <div className='sh-guests-people'>
                    <div className='sh-guests-people_row'>
                        <div className='sh-guests-description'>
                            <span className='sh-guests-description_title'>Adults</span>
                            <span className='sh-guests-description_text'>14 years and up</span>
                        </div>
                        <IncrementDecrement
                            value={this.props.guests.value.adults}
                            increment={() => this.addGuest('adults')}
                            decrement={() => this.removeGuest('adults')}
                            change={this.onChangeGuestsAdults} />
                    </div>
                    <div className='sh-guests-people_row'>
                        <div className='sh-guests-description'>
                            <span className='sh-guests-description_title'>Kids</span>
                            <span className='sh-guests-description_text'>From 2 to 13 years</span>
                        </div>
                        <IncrementDecrement
                            value={this.props.guests.value.kids}
                            increment={() => this.addGuest('kids')}
                            decrement={() => this.removeGuest('kids')}
                            change={this.onChangeGuestsKids} />
                    </div>
                    <div className='sh-guests-people_row'>
                        <div className='sh-guests-description'>
                            <span className='sh-guests-description_title'>Baby</span>
                            <span className='sh-guests-description_text'>Under 2 years</span>
                        </div>                        
                        <IncrementDecrement
                            value={this.props.guests.value.baby}
                            increment={() => this.addGuest('babies')}
                            decrement={() => this.removeGuest('babies')}
                            change={this.onChangeGuestsBaby} />
                        
                    </div>
                </div>
                <div className='sh-guests-rooms'>
                    <div id='oneRoomBox' className='sh-guests-room sh-guests-room--default' onClick={() => this.props.updateGuestsRooms(1)}>
                        <i className='sh-guests-room_icon sh-guests-room_icon--one icon-sh-key'></i>
                        <span>One Room</span>
                    </div>
                    <div id='twoRoomBox' className='sh-guests-room sh-guests-room--default' onClick={ () => this.props.updateGuestsRooms(2) }>
                        <i className='sh-guests-room_icon icon-sh-keys'></i>
                        <span>Two Rooms</span>
                    </div>
                    <div className='sh-guests-room sh-guests-room--counter'>
                        <div className='sh-guests-custom'>
                            <button onClick={ () => this.removeRoom() } className='sh-guests-room_button'><i className='icon-sh-less'></i></button>
                            <input className='sh-guests-room_input' type='text' value={this.props.guests.value.rooms} onChange={this.onChangeGuestsRooms} />
                            <button onClick={ () => this.addRoom() } className='sh-guests-room_button'><i className='icon-sh-plus'></i></button>
                        </div>
                        <span>Rooms</span>
                    </div>
                </div>
            </section>
            <section className='sh-guests-extra'>
                Are you traveling for work?
                <button className={'sh-guests-extra_button btn ' + (!this.props.guests.value.work ? 'is-active' : '')} onClick={() => this.onChangeGuestsWork(false)}>NO</button>
                <button className={'sh-guests-extra_button btn ' + (this.props.guests.value.work ? 'is-active' : '')} onClick={() => this.onChangeGuestsWork(true)}>Yes</button>
            </section>
        </div>);
    }

    private renderOptionPeople(): JSX.Element {
        return (<div className='sh-guests sh-guests--people'>
            <section className='sh-guests-config'>
                <div className='sh-guests-people'>
                    <input type='number' value={this.props.guests.value.people} onChange={this.onChangePeople} />
                </div>
            </section>
        </div>);
    }

    private renderCurrentOption(): JSX.Element {
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

    private FindRoom = (e: any) => {
        if (!this.props.where.value.full && !this.props.when.value.isFilled) {
            e.preventDefault();
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
                        <div className={'sh-search-value ' + (this.props.where.value.full ? 'is-filled' : '')}
                            onClick={this.onClickWhere}>
                            {this.props.where.value.full}
                        </div>
                        <input className={'sh-search-input ' + (!this.props.where.value.full ? '' : 'is-hidden')}
                            type='text'
                            ref='whereinput'
                            onKeyUp={this.onChangeWhere}
                            onClick={this.onClickWhere}
                            placeholder='Where' />
                    </li>

                    <li className='sh-search-group'>
                        <div className={'sh-search-value ' + (this.props.when.value.isFilled ? 'is-filled' : '')}
                            onClick={this.onClickWhen}>
                            {this.props.when.value.full}
                        </div>
                        <input className={'sh-search-input ' + (!this.props.when.value.isFilled ? '' : 'is-hidden')}
                            type='text'
                            ref='wheninput'
                            onClick={this.onClickWhen}
                            placeholder='When' />
                    </li>

                    {this.renderGuestsOrPeople()}

                    <li className='sh-search-group'>
                        <Link to={'/SearchRooms'} className='sh-search-button btn' onClick={this.FindRoom}>
                            Find a Room
                        </Link>
                    </li>

                </ul>
                <section className='sh-search-options'>
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