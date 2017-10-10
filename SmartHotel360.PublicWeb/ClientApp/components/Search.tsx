import * as React from 'react';
import * as moment from 'moment';
import * as $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as SearchStore from '../store/Search';
import Loading from './Loading';
import IncrementDecrement from './IncrementDecrement';
import Checkbox from './Checkbox';

type SearchProps =
    SearchStore.SearchState
    & typeof SearchStore.actionCreators;

class Search extends React.Component<SearchProps, {}> {

    public componentWillUpdate(nextProps: SearchProps): void {
        if (nextProps.guests.value.rooms !== this.props.guests.value.rooms) {
            const $oneRoomBox = $(this.refs.oneRoomBox);
            const $twoRoomBox = $(this.refs.twoRoomBox);
            const $moreRoomBox = $(this.refs.moreRoomBox);

            $oneRoomBox.removeClass('is-active');
            $twoRoomBox.removeClass('is-active');
            $moreRoomBox.removeClass('is-active');

            if (nextProps.guests.value.rooms === 1) {
                $oneRoomBox.addClass('is-active');
                return;
            }

            if (nextProps.guests.value.rooms === 2) {
                $twoRoomBox.addClass('is-active');
                return;
            }

            $moreRoomBox.addClass('is-active');
        }
    }

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
        this.props.resetPeople();
        this.props.resetGuests();
        this.props.resetWhen();
        this.props.resetWhere();
        let input: any = this.refs.whereinput;
        input.value = '';
        setTimeout(() => input.focus(), 10);
    }

    private onSelectWhere = (city: SearchStore.City) => {
        this.props.selectWhere(city)
        this.props.selectWhenStart(moment(this.props.when.value.startDate));
    }

    private renderOptionWhere(): JSX.Element {
        return (<ul>
            {this.props.where.list.map((city: SearchStore.City, key: number) =>
                <div className='sh-search-option' key={key} onClick={() => this.onSelectWhere(city)}>
                    {city.full}
                </div>
            )}
        </ul>);
    }

    private renderGuestsOrPeople() {
        if (this.props.tab === SearchStore.Tab.Smart) {
            return (<li className={'sh-search-group ' + (this.props.selected === SearchStore.Option.Guests ? 'is-active' : '')}>
                <div className={'sh-search-value ' + (this.props.guests.value.isFilled ? 'is-filled' : '')}
                    onClick={this.onClickGuests}>
                    {this.props.guests.value.full}
                </div>
                <span className={'sh-search-input ' + (!this.props.guests.value.isFilled ? '' : 'is-hidden ') + (this.props.selected === SearchStore.Option.Guests ? 'is-active' : '')}
                    onClick={this.onClickGuests}>
                        Guests
                </span>
            </li>);
        }

        if (this.props.tab === SearchStore.Tab.Conference) {
            return (<li className={'sh-search-group ' + (this.props.selected === SearchStore.Option.People ? 'is-active' : '')}>
                <div className={'sh-search-value ' + (this.props.people.value.full ? 'is-filled' : '')}
                    onClick={this.onClickGuests}>
                    {this.props.people.value.full}
                </div>
                <span className={'sh-search-input ' + (!this.props.people.value.full ? '' : 'is-hidden ') + (this.props.selected === SearchStore.Option.Guests ? 'is-active' : '')}
                    onClick={this.onClickGuests}>
                    People
                </span>
            </li>);
        }
    }

    private onClickWhen = () => {
        if (this.props.selected === SearchStore.Option.Where) {
            let input: any = this.refs.whereinput;
            setTimeout(() => input.focus(), 10);
            return;
        }


        this.props.resetPeople();
        this.props.resetGuests();
        this.props.resetWhen();

        this.props.selectWhenEnd(moment(this.props.when.value.endDate));
        this.props.selectWhenStart(moment(this.props.when.value.startDate));
    }

    private onChangeWhenStart = (date: moment.Moment) => {
        this.props.selectWhenStart(date);
    }

    private onChangeWhenEnd = (date: moment.Moment) => {
        this.props.selectWhenEnd(date);
        this.props.updateGuestsAdults(this.props.guests.value.adults);
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
        if (this.props.selected === SearchStore.Option.Where) {
            let input: any = this.refs.whereinput;
            setTimeout(() => input.focus(), 10);
            return;
        }

        if (this.props.selected === SearchStore.Option.When) {
            return;
        }

        this.props.resetGuests();
        this.props.updateGuestsAdults(1);
        this.props.updateGuestsBaby(0);
        this.props.updateGuestsKids(0);
        this.props.updateGuestsRooms(1);
    }

    private checkNumber(n: string): boolean {
        return !n || parseFloat(n) === Number(n);
    }

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

    private removeGuest = (type: SearchStore.Guest) => {        
        switch (type) {
            case SearchStore.Guest.Adults:
                let adults = this.props.guests.value.adults - 1;
                if (adults) {
                    this.props.updateGuestsAdults(adults);
                }
                break;
            case SearchStore.Guest.Kids:
                let kids = this.props.guests.value.kids - 1;
                if (kids >= 0) {
                    this.props.updateGuestsKids(kids);
                }
                break;
            case SearchStore.Guest.Babies:
                let babies = this.props.guests.value.baby - 1;
                if (babies >= 0) {
                    this.props.updateGuestsBaby(babies);
                }
                break;
        }
    }

    private addGuest = (type: SearchStore.Guest) => {
        switch (type) {
            case SearchStore.Guest.Adults:
                let adults = this.props.guests.value.adults + 1;
                this.props.updateGuestsAdults(adults);
                break;
            case SearchStore.Guest.Kids:
                let kids = this.props.guests.value.kids + 1;
                this.props.updateGuestsKids(kids);
                break;
            case SearchStore.Guest.Babies:
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
        if (!this.props.guests.value.rooms || this.props.guests.value.rooms < 2) {
            return;
        }
        let rooms = this.props.guests.value.rooms - 1;
        this.props.updateGuestsRooms(rooms);
    }

    private selectOneRoom = () => {
        this.props.updateGuestsRooms(1);
    }

    private renderOptionGuests(): JSX.Element {
        return (<div className='sh-guests'>
            <section className='sh-guests-config'>
                <div className='sh-guests-people'>
                    <div className='sh-guests-people_row'>
                        <div className='sh-guests-description'>
                            <span className='sh-guests-title'>Adults</span>
                            <span className='sh-guests-text'>14 years and up</span>
                        </div>
                        <IncrementDecrement
                            value={this.props.guests.value.adults}
                            increment={() => this.addGuest(SearchStore.Guest.Adults)}
                            decrement={() => this.removeGuest(SearchStore.Guest.Adults)}
                            change={this.onChangeGuestsAdults} />
                    </div>
                    <div className='sh-guests-people_row'>
                        <div className='sh-guests-description'>
                            <span className='sh-guests-title'>Kids</span>
                            <span className='sh-guests-text'>From 2 to 13 years</span>
                        </div>
                        <IncrementDecrement
                            value={this.props.guests.value.kids}
                            increment={() => this.addGuest(SearchStore.Guest.Kids)}
                            decrement={() => this.removeGuest(SearchStore.Guest.Kids)}
                            change={this.onChangeGuestsKids} />
                    </div>
                    <div className='sh-guests-people_row'>
                        <div className='sh-guests-description'>
                            <span className='sh-guests-title'>Baby</span>
                            <span className='sh-guests-text'>Under 2 years</span>
                        </div>
                        <IncrementDecrement
                            value={this.props.guests.value.baby}
                            increment={() => this.addGuest(SearchStore.Guest.Babies)}
                            decrement={() => this.removeGuest(SearchStore.Guest.Babies)}
                            change={this.onChangeGuestsBaby} />

                    </div>
                </div>
                <div className='sh-guests-rooms'>
                    <div ref='oneRoomBox' className='sh-guests-room sh-guests-room--default is-active' onClick={() => this.props.updateGuestsRooms(1)}>
                        <i className='sh-guests-room_icon sh-guests-room_icon--one icon-sh-key'></i>
                        <span>One Room</span>
                    </div>
                    <div ref='twoRoomBox' className='sh-guests-room sh-guests-room--default' onClick={() => this.props.updateGuestsRooms(2)}>
                        <i className='sh-guests-room_icon icon-sh-keys'></i>
                        <span>Two Rooms</span>
                    </div>
                    <div ref='moreRoomBox' className='sh-guests-room sh-guests-room--counter'>
                        <div className='sh-guests-custom'>
                            <button onClick={() => this.removeRoom()} className='sh-guests-room_button'><i className='icon-sh-less'></i></button>
                            <input className='sh-guests-room_input' type='text' value={this.props.guests.value.rooms} onChange={this.onChangeGuestsRooms} />
                            <button onClick={() => this.addRoom()} className='sh-guests-room_button'><i className='icon-sh-plus'></i></button>
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

    private addPeople = () => {
        let people = this.props.people.value.total + 1;
        this.props.updatePeople(people);
    }

    private removePeople = () => {
        let people = this.props.people.value.total - 1;
        if (!people) {
            return;
        }
        this.props.updatePeople(people);
    }

    private selectService = (e: any) => {
        $(e.currentTarget).toggleClass('is-active');
    }

    private renderOptionPeople(): JSX.Element {
        let services = [
            {
                icon: 'sh-wifi',
                description: 'Free Wi-Fi'
            },
            {
                icon: 'sh-air-conditioning',
                description: 'Air conditioning'
            },
            {
                icon: 'sh-breakfast',
                description: 'Breakfast'
            },
            {
                icon: 'sh-elevator',
                description: 'Elevator'
            }
        ]

        return (<div className='sh-guests sh-guests--people'>
            <section className='sh-guests-config'>
                <div className='sh-guests-people'>
                    <div className='sh-guests-people_row'>
                        <div className='sh-guests-description'>
                            <span className='sh-guests-title'>People (1-40)</span>
                            <span className='sh-guests-text'>(1-40 people)</span>
                            <a className='sh-guests-link'>Request Quotes (41+ people)</a>
                        </div>
                        <IncrementDecrement
                            value={this.props.people.value.total}
                            increment={() => this.addPeople()}
                            decrement={() => this.removePeople()}
                            change={() => this.onChangePeople} />
                    </div>
                </div>
                <div className='sh-guests-people_services'>
                    <ul className='sh-guests-services'>
                        {services.map((service: any, key: any) =>
                            <li className='sh-guests-service' onClick={this.selectService} key={key}><i className={`sh-guests-service_icon icon-${service.icon}`}></i>{service.description}</li>
                        )}
                    </ul>
                    <div className='sh-guests-form'>
                        <Checkbox name='Need more options?' />
                        <textarea className='sh-guests-textarea' />
                    </div>
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

    public render(): JSX.Element {
        return <div className='sh-search'>
            <div className='sh-search-wrapper'>
                <ul className='sh-search-tabs'>
                    <li className={'sh-search-tab ' + (this.props.tab === SearchStore.Tab.Smart ? 'is-active' : '')}
                        onClick={() => this.onClickTab(SearchStore.Tab.Smart)}>
                        Smart Room
                    </li>
                    <li className={'sh-search-tab ' + (this.props.tab === SearchStore.Tab.Conference ? 'is-active' : '')}>
                        Conference Room
                   </li>
                </ul>
                <ul className='sh-search-inputs'>
                    <li className={'sh-search-group ' + (this.props.selected === SearchStore.Option.Where ? 'is-active' : '')}>
                        <div className={'sh-search-value ' + (this.props.where.value.full ? 'is-filled' : '')}
                            onClick={this.onClickWhere}>
                            {this.props.where.value.full}
                        </div>
                        <input className={'sh-search-input ' + (!this.props.where.value.full ? '' : 'is-hidden')}
                            type='text'
                            ref='whereinput'
                            placeholder='Where'
                            onKeyUp={this.onChangeWhere}
                            onClick={this.onClickWhere} />
                    </li>

                    <li className={'sh-search-group ' + (this.props.selected === SearchStore.Option.When ? 'is-active' : '')}>
                        <div className={'sh-search-value ' + (this.props.when.value.isFilled ? 'is-filled' : '')}
                            onClick={this.onClickWhen}>
                            {this.props.when.value.full}
                        </div>
                        <span className={'sh-search-input ' + (!this.props.when.value.isFilled ? '' : 'is-hidden ') + (this.props.selected === SearchStore.Option.When ? 'is-active' : '')}
                            onClick={this.onClickWhen}> 
                                When
                        </span>
                    </li>

                    {this.renderGuestsOrPeople()}

                    <li className='sh-search-group'>
                        <Link to={'/SearchRooms'} className={'sh-search-button btn ' + (this.props.where.value.full && this.props.when.value.isFilled ? '' : 'is-disabled')}>
                            {this.props.tab === SearchStore.Tab.Smart ? 'Find a Room' : 'Find a Conference Room'}
                        </Link>
                    </li>

                </ul>
                <section className={'sh-search-options ' + (this.props.started ? '' : 'is-hidden')}>
                    {this.props.isLoading ? <Loading /> : this.renderCurrentOption()}
                </section>
            </div>
        </div>;
    }

}

// wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.search, // selects which state properties are merged into the component's props
    SearchStore.actionCreators                 // selects which action creators are merged into the component's props
)(Search) as any;