import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { RouteComponentProps, Link } from 'react-router-dom';
import SearchInfo from './SearchInfo';
import * as RoomDetailStore from '../store/RoomDetail';
import * as SearchStore from '../store/RoomDetail';
import Loading from './Loading';

type RoomDetailProps =
    RoomDetailStore.RoomDetailState
    & SearchStore.RoomDetailState
    & typeof RoomDetailStore.actionCreators
    & RouteComponentProps<{}>

// TODO Remove any
class RoomDetail extends React.Component<any, {}> {

    public componentDidMount() {
        this.props.init();
    }

    private onClickTab = (tab: RoomDetailStore.Tabs) => {
        this.props.switchTab(tab);
    }

    private onClickBook = () => {
        this.props.book();
    }

    private renderDescription() {
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
        ];

        return (<div>
            <article className='sh-room_detail-description'>
                {this.props.room.description}
            </article>
            <h3 className='sh-room_detail-subtitle'>Services</h3>
            <div className='sh-room_detail-extra'>
                <ul className='sh-room_detail-services'>
                    {services.map((service: any, key: number) =>
                        <li className='sh-room_detail-service' key={key}>
                            <i className={`sh-room_detail-service_icon icon-${service.icon}`}></i>
                            {service.description}
                        </li>
                    )}
                </ul>
            </div>
            <div className='sh-room_detail-extra'>
                <h3 className='sh-room_detail-subtitle'>Information</h3>

                <div className='sh-room_detail-extra'>
                    <h4 className='sh-room_detail-smalltitle'>Check-In/Out</h4>
                    <p className='sh-room_detail-text'>12:00 pm / 11:00 pm</p>
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
                    <li className='sh-room_detail-picture'></li>
                    <li className='sh-room_detail-picture'></li>
                    <li className='sh-room_detail-picture'></li>
                    <li className='sh-room_detail-picture'></li>
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
                'user': 'Sophia Campbell',
                'room': 'Double room',
                'message': 'From the moment you step in, you can perfectly understand why this hotel has been short listed for the annual World Architecture Festival Awards...',
                'date': '2010-06-13T00:00:00',
                'rating': 3
            },
            {
                'user': 'Timothy Lucas',
                'room': 'Single room',
                'message': 'Hotel located just behind the Tate, with great breakfast spots and Borough Market nearby. Two people stay for the same price as one, so bring a friend. Whom you would share a double bed with.',
                'date': '2010-12-14T00:00:00',
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
                                    <span>{review.date}</span>
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
        switch (this.props.tab) {
            case RoomDetailStore.Tabs.Hotel:
                return this.renderDescription();
            case RoomDetailStore.Tabs.Reviews:
                return this.renderReviews();
        }
    }

    private setBackgroundImage(image: string): { [key: string]: string } {
        return {
            backgroundImage: `url(${image})`
        };
    }

    public render() {
        return <div className='sh-room_detail'>
            <SearchInfo />
            <Link className='sh-room_detail-back' to={`/SearchRooms`}><i className='sh-room_detail-arrow icon-sh-chevron'></i>Back to hotels</Link>
            <header className='sh-room_detail-background' style={this.setBackgroundImage(this.props.room.image)}>
            </header>
            <section className='sh-room_detail-wrapper'>
                <div className='sh-room_detail-column sh-room_detail-column--left'>
                    <ul className='sh-room_detail-tabs'>
                        <li className={'sh-room_detail-tab ' + (this.props.tab === RoomDetailStore.Tabs.Hotel ? 'is-active' : '')}
                            onClick={() => this.onClickTab(RoomDetailStore.Tabs.Hotel)}>
                            The Hotel
                        </li>
                        <li className={'sh-room_detail-tab ' + (this.props.tab === RoomDetailStore.Tabs.Reviews ? 'is-active' : '')}
                            onClick={() => this.onClickTab(RoomDetailStore.Tabs.Reviews)}>
                            Reviews
                        </li>
                    </ul>
                    <div className='sh-room_detail-content'>
                        <header className='sh-room_detail-header'>
                            <span className='sh-room_detail-title'>{this.props.room.name}</span>
                            <div className='sh-room_detail-stars'></div>
                            <span className='sh-room_detail-location'>{this.props.room.location}</span>
                        </header>
                        {this.renderCurrentOption()}
                    </div>
                </div>
                <div className='sh-room_detail-column sh-room_detail-column--right'>
                    <aside className='sh-room_detail-filters'>
                        <header className='sh-room_detail-filter_header'>
                            <span className='sh-room_detail-filter_title'>{this.props.room.price}</span>
                            <span>Total</span>
                        </header>
                        <section className='sh-room_detail-info'>
                            <span className='sh-room_detail-title'>{this.props.room.name}</span>
                            <span className='sh-room_detail-location u-display-block'>{this.props.room.location}</span>
                            <span className='sh-room_detail-phone u-display-block'>{this.props.room.phone}</span>

                            <div className='sh-room_detail-extra sh-room_detail-extra--double row'>
                                <div className='col-xs-6'>
                                    <span className='sh-room_detail-small'>Check-In</span>
                                    <span className='sh-room_detail-smalltitle'>{this.props.when.value.startFullComplex}</span>
                                </div>
                                <div className='col-xs-6'>
                                    <span className='sh-room_detail-small'>Check-Out</span>
                                    <span className='sh-room_detail-smalltitle'>{this.props.when.value.endFullComplex}</span>
                                </div>
                            </div>
                            <div className='sh-room_detail-extra row'>
                                <div className='col-xs-4'>
                                    <span className='sh-room_detail-small'>Room</span>
                                    <span className='sh-room_detail-smalltitle'>{this.props.guests.value.roomsFull}</span>
                                </div>
                                <div className='col-xs-4'>
                                    <span className='sh-room_detail-small'>Guests</span>
                                    <span className='sh-room_detail-smalltitle'>{this.props.guests.value.guestsFull}</span>
                                </div>
                                <div className='col-xs-4'>
                                    <span className='sh-room_detail-small'>Rate</span>
                                    <span className='sh-room_detail-smalltitle'>{this.props.room.price}</span>
                                </div>
                            </div>

                            <div className={'sh-room_detail-extra sh-room_detail-extra--double row ' + (this.props.booked ? '' : 'is-invisible')}>
                                <div className='col-xs-12'>
                                    <span className='sh-room_detail-smalltitle'>Thanks USERNAME,</span>
                                    <span className='sh-room_detail-small'>Your booking at {this.props.room.name} is confirmed.</span>
                                </div>
                            </div>

                            <div className='sh-room_detail-extra'>
                                <span className={'sh-room_detail-book btn ' + (this.props.booked ? 'is-disabled' : '')}
                                        onClick={this.onClickBook}>
                                    {this.props.isBooking ? <Loading isBright={true} /> : 'Book now'}
                                </span>
                            </div>
                        </section>
                    </aside>
                </div>
            </section>
        </div>;
    }
}

// wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => { return { ...state.roomDetail, ...state.search } }, // selects which state properties are merged into the component's props
    RoomDetailStore.actionCreators // selects which action creators are merged into the component's props
)(RoomDetail) as any;