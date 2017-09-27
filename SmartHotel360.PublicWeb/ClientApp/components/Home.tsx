import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className='sh-home'>
            <div className='sh-hero'>
                <div className='sh-hero-wrapper'>
                    <div className='sh-hero-title'>The future of intelligent hospitality and connected workplace</div>
                    <div className='sh-hero-download'>
                        <span>Download the app</span>
                    </div>
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
            <section className='sh-infogrid'>
                <p className='sh-infogrid-title'>The smart experience</p>
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
                    <div className='sh-infogrid-column sh-infogrid-column--even'>
                        <img className='sh-infogrid-icon' src='/assets/images/ic_personalize.svg' />
                        <div className='sh-infogrid-description sh-infogrid-description--even'>
                            <p className='sh-infogrid-subtitle'>Personalize your experience</p>
                            <span className='sh-infogrid-text'>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                            </span>
                        </div>
                    </div>
                </article>

                <article className='sh-infogrid-row'>
                    <div className='sh-infogrid-column'>
                        <img className='sh-infogrid-icon' src='/assets/images/ic_padlock.svg' />
                        <div className='sh-infogrid-description'>
                            <p className='sh-infogrid-subtitle'>Find and access your room</p>
                            <span className='sh-infogrid-text'>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                            </span>
                        </div>
                    </div>
                </article>

                <article className='sh-infogrid-row'>                        
                    <div className='sh-infogrid-column sh-infogrid-column--even'>
                        <img className='sh-infogrid-icon' src='/assets/images/ic_begreen.svg' />
                        <div className='sh-infogrid-description sh-infogrid-description--even'>
                            <p className='sh-infogrid-subtitle'>Be green</p>
                            <span className='sh-infogrid-text'>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                            </span>
                        </div>
                    </div>
                </article>
            </section>
        </div>;
    }
}
