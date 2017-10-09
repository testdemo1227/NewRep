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
                        <img className='sh-infogrid-icon' src='/assets/images/ic_check.svg' />
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Check in from your phone</p>
                            <span className='sh-infogrid-text'>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                            </span>
                        </div>
                    </div>
                </article>

                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <img className='sh-infogrid-icon sh-infogrid-icon--padlock' src='/assets/images/ic_padlock.svg' />
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Find and access your room</p>
                            <span className='sh-infogrid-text'>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                            </span>
                        </div>
                    </div>
                </article>

                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <img className='sh-infogrid-icon' src='/assets/images/ic_personalize.svg' />
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Personalize your experience</p>
                            <span className='sh-infogrid-text'>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                            </span>
                        </div>
                    </div>
                </article>


                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <img className='sh-infogrid-icon' src='/assets/images/ic_begreen.svg' />
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Be green</p>
                            <span className='sh-infogrid-text'>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                            </span>
                        </div>
                    </div>
                </article>
            </section>

            <span className='sh-home-label'>For Business travelers</span>
            <span className='sh-home-title'>Smart conference rooms</span>
            <ConferenceRoomsFeatures />
            
            <section className='sh-smartphone'>
                <div className='sh-smartphone-wrapper'>
                    <h2 className='sh-smartphone-title'>Discover the full smart experience with your smartphone</h2>
                    <p className='sh-smartphone-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar orci nibh, et finibus ipsum efficitur id. Suspendisse ac mauris blandit, dictum orci eget, ornare dui. Pellentesque at ligula imperdiet, consectetur velit non, malesuada metus. Integer id metus vitae est interdum tincidunt sed sit amet nulla.</p>
                    <img className='sh-smartphone-image' src=' /assets/images/smartphone.png' />
                </div>
                <div className='sh-smartphone-quote'>
                    <p className='sh-smartphone-quote_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar orci nibh, et finibus ipsum efficitur id. Suspendisse ac mauris blandit, dictum orci eget, ornare dui. Pellentesque at ligula imperdiet, consectetur velit non, malesuada metus. Integer id metus vitae est interdum tincidunt sed sit amet nulla.</p>
                    <p className='sh-smartphone-quote_author'>Lorem Ipsum</p>
                </div>
            </section>

            <span className='sh-home-title'>Rooms and Conference Rooms</span>
            <Rooms component={RoomHighlighted} source={RoomsState.Sources.Featured} />
        </div>;
    }
}
