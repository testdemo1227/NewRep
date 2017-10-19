import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { RouteComponentProps, Link } from 'react-router-dom';
import SearchInfo from './SearchInfo';
import * as RoomDetailStore from '../store/RoomDetail';
import * as SearchStore from '../store/Search';
import * as UserStore from '../store/User';
import Loading from './Loading';
import * as moment from 'moment';
import { settings } from '../Settings';

type RoomDetailProps =
    RoomDetailStore.RoomDetailState
    & { search: SearchStore.SearchState }
    & { user: UserStore.UserState }
    & typeof RoomDetailStore.actionCreators
    & RouteComponentProps<{}>

interface LocalState {
    bookingText: string;
    canBook: boolean;
    tab: RoomDetailStore.Tabs;
}

// TODO Remove any
class RoomDetail extends React.Component<any, LocalState> {

    public componentWillMount() {
        this.state = {
            bookingText: 'Login to book',
            canBook: false,
            tab: RoomDetailStore.Tabs.Hotel
        };

        if (this.props.user.id) {
            this.setState(prev => ({ ...prev, bookingText: 'Book now', canBook: true }));
        }
    }

    public componentDidMount() {
        this.props.init();
        this.props.requestRoom(this.props.match.params.hotelId);
    }

    private onClickTab = (tab: RoomDetailStore.Tabs) => {
        this.setState(prev => ({ ...prev, tab: tab }));
    }

    private onClickBook = () => {
        if (this.props.user.id) {
            let booking = new RoomDetailStore.Booking(this.props.match.params.hotelId,
                this.props.user.email,
                this.props.search.when.value.endDate,
                this.props.search.when.value.startDate,
                this.props.search.guests.value.adults,
                this.props.search.guests.value.kids,
                this.props.search.guests.value.baby,
                0,
                this.calculateTotal()
            )
            this.props.book(booking, this.props.user.token);
            return;
        }

        this.setState(prev => ({ ...prev, bookingText: 'Login to book' }));
    }

    private calculateTotal = () => {
        let start = moment(SearchStore.getLongDate(this.props.search.when.value.startDate));
        let end = moment(SearchStore.getLongDate(this.props.search.when.value.endDate));
        let nights = Math.abs(start.diff(end, 'days'));
        return this.props.room.pricePerNight * nights;
    }

    private formatHours = (hour: string) => {
        return moment(hour, ['h:mm A']).format('hh:mm A');
    }

    private getServicesIcon = (key: number) => {
        if (!key) {
            return;
        }
        return RoomDetailStore.ServicesDictionary[key];
    }

    private renderDescription() {
        return (<div>
            <article className='sh-room_detail-description'>
                {this.props.room.description}
            </article>
            <h3 className='sh-room_detail-subtitle'>Services</h3>
            <div className='sh-room_detail-extra'>
                <ul className='sh-room_detail-services'>
                    {this.props.room.services.map((service: any, key: number) =>
                        <li className='sh-room_detail-service' key={key}>
                            <i className={`sh-room_detail-service_icon icon-${this.getServicesIcon(service.id)}`}></i>
                            {service.name}
                        </li>
                    )}
                </ul>
            </div>
            <div className='sh-room_detail-extra'>
                <h3 className='sh-room_detail-subtitle'>Information</h3>

                <div className='sh-room_detail-extra'>
                    <h4 className='sh-room_detail-smalltitle'>Check-In/Out</h4>
                    <p className='sh-room_detail-text'>{this.formatHours(this.props.room.checkInTime)} / {this.formatHours(this.props.room.checkOutTime)}</p>
                </div>

                <div className='sh-room_detail-extra'>
                    <h4 className='sh-room_detail-smalltitle'>Cancellation policy</h4>
                    <p className='sh-room_detail-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>

                <div className='sh-room_detail-extra'>
                    <h4 className='sh-room_detail-smalltitle'>Kids policy</h4>
                    <p className='sh-room_detail-text'>Free Kids under 3 years</p>
                    <p className='sh-room_detail-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
            </div>
            <div className='sh-room_detail-extra'>
                <ul className='sh-room_detail-gallery'>
                    {this.props.room.pictures.map((picture: string, key: number) =>
                        <li className='sh-room_detail-picture' key={key} style={this.setBackgroundImage(picture)}></li>
                    )}
                </ul>
            </div>
        </div>);
    }

    private drawStars(rating: number): JSX.Element[] {
        const max = 5;
        let stars = [];

        for (let i = 1; i <= max; i++) {
            stars.push(<i className={'sh-room_detail-star active icon-sh-star ' + (i <= rating ? 'is-active' : '')} key={i}></i>);
        }

        return stars;
    }

    private formatDate = (date: moment.Moment) => {
        date = moment(date);
        return date ? `${date.format('D MMM YYYY')}` : '';
    }

    private renderReviews() {
        let reviews = [
            {
                'user': 'Della Howell',
                'room': 'Double room',
                'message': 'Brings together the integrity and character of a historic building with a simple, sophisticated design. Boasts 173 rooms, a restaurant, two bars, an event space, meeting rooms and an inviting lobby.',
                'date': '2012-03-14T00:00:00',
                'rating': 4
            },
            {
                'user': 'Timothy Lucas',
                'room': 'Single room',
                'message': 'Hotel located just behind the Tate, with great breakfast spots and Borough Market nearby. Two people stay for the same price as one, so bring a friend. Whom you would share a double bed with.',
                'date': '2010-12-14T00:00:00',
                'rating': 3
            },
            {
                'user': 'Sophia Campbell',
                'room': 'Double room',
                'message': 'From the moment you step in, you can perfectly understand why this hotel has been short listed for the annual World Architecture Festival Awards...',
                'date': '2010-06-13T00:00:00',
                'rating': 3
            }
        ];

        return (<div>
            <div className='sh-room_detail-extra'>
                <ul className='sh-room_detail-reviews'>
                    {reviews.map((review: any, key: number) =>
                        <li className='sh-room_detail-review' key={key}>
                            <header className='sh-room_detail-review_header'>
                                <div>
                                    <span className='sh-room_detail-subtitle u-pr-2'>{review.user}</span>
                                    <span className='sh-room_detail-smalltitle u-pr-2'>{review.room}</span>
                                    <span className='sh-room_detail-date'>{this.formatDate(review.date)}</span>
                                </div>
                                <div>
                                    {this.drawStars(review.rating)}
                                </div>
                            </header>
                            <div className='sh-room_detail-extra'>
                                <p className='sh-room_detail-text'>{review.message}</p>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>);
    }

    private renderCurrentOption(): any {
        switch (this.state.tab) {
            case RoomDetailStore.Tabs.Hotel:
                return this.renderDescription();
            case RoomDetailStore.Tabs.Reviews:
                return this.renderReviews();
        }
    }

    private setBackgroundImage(image: string): { [key: string]: string } {
        return {
            backgroundImage: `url(${settings.urls.images_Base}${image})`
        };
    }

    private renderAsideBooking = () => {
        return <aside className='sh-room_detail-filters'>
            <header className='sh-room_detail-filter_header'>
                <span className='sh-room_detail-filter_title'>{`$${this.calculateTotal()}`}</span>
                <span>Total</span>
            </header>
            <section className='sh-room_detail-info'>
                <div className='sh-room_detail-title'>{this.props.room.name}</div>
                <span className='sh-room_detail-location u-display-block'>{this.props.room.location}</span>
                <span className='sh-room_detail-phone u-display-block'>{this.props.room.phone}</span>

                <div className='sh-room_detail-extra sh-room_detail-extra--double row'>
                    <div className='col-xs-6'>
                        <span className='sh-room_detail-small'>Check-In</span>
                        <span className='sh-room_detail-smalltitle'>{SearchStore.getLongDate(this.props.search.when.value.startDate)}</span>
                    </div>
                    <div className='col-xs-6'>
                        <span className='sh-room_detail-small'>Check-Out</span>
                        <span className='sh-room_detail-smalltitle'>{SearchStore.getLongDate(this.props.search.when.value.endDate)}</span>
                    </div>
                </div>
                <div className='sh-room_detail-extra row'>
                    <div className='col-xs-4'>
                        <span className='sh-room_detail-small'>Room</span>
                        <span className='sh-room_detail-smalltitle'>{SearchStore.getFullRooms(this.props.search.guests.value)}</span>
                    </div>
                    <div className='col-xs-4'>
                        <span className='sh-room_detail-small'>Guests</span>
                        <span className='sh-room_detail-smalltitle'>{SearchStore.getFullGuests(this.props.search.guests.value)}</span>
                    </div>
                    <div className='col-xs-4'>
                        <span className='sh-room_detail-small'>Rate</span>
                        <span className='sh-room_detail-smalltitle'>{`$${this.calculateTotal()}`}</span>
                    </div>
                </div>

                <div className={'sh-room_detail-extra sh-room_detail-extra--double row ' + (this.props.booked ? '' : 'is-invisible')}>
                    <div className='col-xs-12'>
                        <span className='sh-room_detail-smalltitle'>Thanks {this.props.user.name},</span>
                        <span className='sh-room_detail-small'>Your booking at {this.props.room.name} is confirmed.</span>
                    </div>
                </div>

                <div className='sh-room_detail-extra'>
                    <span className={'sh-room_detail-book btn ' + (this.props.booked || !this.state.canBook ? 'is-disabled' : '')}
                        onClick={this.onClickBook}>
                        {this.props.isBooking ? <Loading isBright={true} /> : this.state.bookingText}
                    </span>
                </div>
            </section>
        </aside>
    }

    public render() {
        return <div className='sh-room_detail'>
            <div className='sh-room_detail-search'>
                <SearchInfo />
            </div>

            <Link className='sh-room_detail-back' to={`/SearchRooms`}><i className='sh-room_detail-arrow icon-sh-chevron'></i>Back to hotels</Link>
            {this.props.isLoading ? <Loading /> : <header className='sh-room_detail-background' style={this.setBackgroundImage(this.props.room.defaultPicture)}>
                <div className='sh-room_detail-show_small'> {this.renderAsideBooking()}</div>
            </header>}
            <section className='sh-room_detail-wrapper'>
                <div className='sh-room_detail-column sh-room_detail-column--left'>
                    <ul className='sh-room_detail-tabs'>
                        <li className={'sh-room_detail-tab ' + (this.state.tab === RoomDetailStore.Tabs.Hotel ? 'is-active' : '')}
                            onClick={() => this.onClickTab(RoomDetailStore.Tabs.Hotel)}>
                            The Hotel
                        </li>
                        <li className={'sh-room_detail-tab ' + (this.state.tab === RoomDetailStore.Tabs.Reviews ? 'is-active' : '')}
                            onClick={() => this.onClickTab(RoomDetailStore.Tabs.Reviews)}>
                            Reviews
                        </li>
                    </ul>
                    <div className='sh-room_detail-content'>
                        <header className='sh-room_detail-header'>
                            <div className='sh-room_detail-group'>
                                <span className='sh-room_detail-title'>{this.props.room.name}</span>
                                <div className='sh-room_detail-stars'>{this.drawStars(this.props.room.rating)}</div>
                            </div>
                            <span className='sh-room_detail-location'>{this.props.room.city}</span>
                        </header>
                        {this.renderCurrentOption()}
                    </div>
                </div>
                <div className='sh-room_detail-column sh-room_detail-column--right'>
                    {this.renderAsideBooking()}
                </div>
            </section>
        </div>;
    }
}

// wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => ({ ...state.roomDetail, search: state.search, user: state.user }), // selects which state properties are merged into the component's props
    RoomDetailStore.actionCreators // selects which action creators are merged into the component's props
)(RoomDetail) as any;