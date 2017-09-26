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
            <section className='sh-home-info'>
                <p className='sh-home-info-title'>The smart experience</p>
                <article className='sh-home-info-row'>
                    <div className='sh-home-info-icon'>
                        <img src='/assets/images/ic_check.svg' />
                    </div>
                    <div className='sh-home-info-column'>
                        <p className='sh-home-info-subtitle'>Check in from your phone</p>
                        <span className='sh-home-info-text'>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley. 
                        </span>
                    </div>
                </article>

                <article className='sh-home-info-row'>
                    <div className='sh-home-info-icon'>
                        <img src='/assets/images/ic_personalize.svg' />
                    </div>
                    <div className='sh-home-info-column'>
                        <p className='sh-home-info-subtitle'>Personalize your experience</p>
                        <span className='sh-home-info-text'>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                        </span>
                    </div>
                </article>

                <article className='sh-home-info-row'>
                    <div className='sh-home-info-icon'>
                        <img src='/assets/images/ic_padlock.svg' />
                    </div>
                    <div className='sh-home-info-column'>
                        <p className='sh-home-info-subtitle'>Find and access your room</p>
                        <span className='sh-home-info-text'>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                        </span>
                    </div>
                </article>

                <article className='sh-home-info-row'>
                    <div className='sh-home-info-icon'>
                        <img src='/assets/images/ic_begreen.svg' />
                    </div>
                    <div className='sh-home-info-column'>
                        <p className='sh-home-info-subtitle'>Be green</p>
                        <span className='sh-home-info-text'>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                        </span>
                    </div>
                </article>
            </section>
        </div>;
    }
}
