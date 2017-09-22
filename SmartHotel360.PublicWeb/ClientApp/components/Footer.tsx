import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class Footer extends React.Component<{}, {}> {
    public render() {
        return <div className='sh-footer-content'>
            <div className='sh-footer-section'>
                <img className="sh-footer-logo" src='/assets/images/logo.svg' />
            </div>
            <div>
                <div className='sh-footer-section'>
                    <ul className='sh-footer-list'>
                        <li>
                            <a className='sh-footer-link' href='#'>The smart experience</a>
                        </li>
                        <li>
                            <a className='sh-footer-link' href='#'>Cities</a>
                        </li>
                        <li>
                            <a className='sh-footer-link' href='#'>Rooms</a>
                        </li>
                        <li>
                            <a className='sh-footer-link' href='#'>Conference rooms</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div className='sh-footer-section'>
                    <ul className='sh-footer-list'>
                        <li>
                            <a className='sh-footer-link' href='#'>Terms & Conditions</a>
                        </li>
                        <li>
                            <a className='sh-footer-link' href='#'>Privacy Policy</a>
                        </li>
                        <li>
                            <a className='sh-footer-link' href='#'>Help</a>
                        </li>
                        <li>
                            <a className='sh-footer-link' href='#'>Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div className='sh-footer-section'>
                    <p>Share</p>
                    <ul className='sh-footer-social'>
                        <li>
                            <a href='#'>
                                <img className="sh-footer-social_icon" src='/assets/images/instagram.svg' />
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <img className="sh-footer-social_icon" src='/assets/images/facebook.svg' />
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <img className="sh-footer-social_icon" src='/assets/images/twitter.svg' />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
