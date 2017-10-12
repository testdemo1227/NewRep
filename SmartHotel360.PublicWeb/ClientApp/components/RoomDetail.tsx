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

    private renderCurrentOption(): any {
        switch (this.props.tab) {
            case RoomDetailStore.Tabs.Hotel:
                return (<article className='sh-room_detail-description'>
                    {this.props.room.description}
                </article>)
            case RoomDetailStore.Tabs.Reviews:
                return (<article>reviews</article>)
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
                                    <span className='sh-room_detail-subtitle'>{this.props.when.value.startFullComplex}</span>
                                </div>
                                <div className='col-xs-6'>
                                    <span className='sh-room_detail-small'>Check-Out</span>
                                    <span className='sh-room_detail-subtitle'>{this.props.when.value.endFullComplex}</span>
                                </div>
                            </div>
                            <div className='sh-room_detail-extra row'>
                                <div className='col-xs-4'>
                                    <span className='sh-room_detail-small'>Room</span>
                                    <span className='sh-room_detail-subtitle'>{this.props.guests.value.roomsFull}</span>
                                </div>
                                <div className='col-xs-4'>
                                    <span className='sh-room_detail-small'>Guests</span>
                                    <span className='sh-room_detail-subtitle'>{this.props.guests.value.guestsFull}</span>
                                </div>
                                <div className='col-xs-4'>
                                    <span className='sh-room_detail-small'>Rate</span>
                                    <span className='sh-room_detail-subtitle'>{this.props.room.price}</span>
                                </div>
                            </div>

                            <div className={'sh-room_detail-extra sh-room_detail-extra--double row ' + (this.props.booked ? '' : 'is-invisible')}>
                                <div className='col-xs-12'>
                                    <span className='sh-room_detail-subtitle'>Thanks USERNAME,</span>
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
            <section className='sh-room_detail-wrapper'>
                <div className='sh-room_detail-column sh-room_detail-column--left'>
                    <ul className='sh-room_detail-gallery'>
                        <li className='sh-room_detail-picture'></li>
                        <li className='sh-room_detail-picture'></li>
                        <li className='sh-room_detail-picture'></li>
                        <li className='sh-room_detail-picture'></li>
                    </ul>
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