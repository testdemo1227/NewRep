import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ConferenceRoomsFeatures from './ConferenceRoomsFeatures';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import Rooms from './Rooms';
import * as RoomsState from '../store/Rooms';
import Search from './Search';
import { RoomHighlighted } from './RoomHighlighted';

type HomeProps =
    RouteComponentProps<{}>;

export default class Home extends React.Component<HomeProps, {}> {
    public render() {
        return <div className='sh-home'>           
            <div className='sh-hero'>
                <div className='sh-hero-wrapper'>
                    <div className='sh-hero-title'>The future of intelligent hospitality and connected workplace</div>
                    <ul className='sh-hero-buttons'>
                        <li className='sh-hero-button'>
                            <div className='sh-hero-download_app sh-hero-download_app--win'></div>
                        </li>
                        <li className='sh-hero-button'>
                            <div className='sh-hero-download_app sh-hero-download_app--apple'></div>
                        </li>
                        <li className='sh-hero-button'>
                            <div className='sh-hero-download_app sh-hero-download_app--google'></div>
                        </li>
                    </ul>
                </div>
            </div>
            <Search />
            <section className='sh-infogrid'>
                <p className='sh-home-title'>The smart experience</p>
                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <i className='sh-infogrid-icon icon-sh-smart-check'></i>
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Check in from your phone</p>
                            <span className='sh-infogrid-text'>
                                Use your personal device and the SmartHotel360 app to accelerate your check-in experience. Using secure technology, we can skip that reception desk and use our phone and app as our room key. Letting you relax as soon as you arrive.
                            </span>
                        </div>
                    </div>
                </article>

                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <i className='sh-infogrid-icon icon-sh-smart-finde'></i>
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Find and access your room</p>
                            <span className='sh-infogrid-text'>
                                Use the SmartHotel360 app, to quickly find and share your room locations with your friends and colleges.
                            </span>
                        </div>
                    </div>
                </article>

                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <i className='sh-infogrid-icon icon-sh-smart-perso'></i>
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Personalize your experience</p>
                            <span className='sh-infogrid-text'>
                                Use the SmartHotel360 app to configure your home away from home. Set room temperatures, or reserve accommodations. Review our personalization settings by using the SmartHotel360 app.
                            </span>
                        </div>
                    </div>
                </article>


                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <i className='sh-infogrid-icon icon-sh-smart-green'></i>
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Go green</p>
                            <span className='sh-infogrid-text'>
                                One of SmartHotel360 goals is to minimization our carbon footprint. From sensors managing our Hotels energy usage to Apps that reduce required work hours, we are constantly seeking new ways to improve our surroundings.
                            </span>
                        </div>
                    </div>
                </article>
            </section>

            <span className='sh-home-label'>For Business travelers</span>
            <span className='sh-home-title'>Smart Conference Room</span>
            <ConferenceRoomsFeatures />
            
            <section className='sh-smartphone'>
                <div className='sh-smartphone-wrapper'>
                    <h2 className='sh-smartphone-title'>Discover the full smart experience with your smartphone</h2>
                    <p className='sh-smartphone-description'>Explore our digital presence. Take a tour of our hotels, explore and plan your next get away. Get tips and recommendation on how to expand your experience with SmartHotel360.</p>
                    <img className='sh-smartphone-image' src=' /assets/images/smartphone.png' />
                </div>
                <div className='sh-smartphone-quote'>
                    <p className='sh-smartphone-quote_text'>"The hospitality and convenience of the SmartHotel360, makes my professional business travel so efficient. I can view and reserve everything I need to be a productive professional, before I even step foot in the city I am visiting. Giving me, much needed peace of mind leading up to my presentations."</p>
                </div>
            </section>

            <span className='sh-home-title'>Rooms and Conference Rooms</span>
            <Rooms component={RoomHighlighted} source={RoomsState.Sources.Featured} />
        </div>;
    }
}
