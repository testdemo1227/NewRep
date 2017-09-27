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
            <div className='sh-smartphone'>
                <div className='sh-smartphone-wrapper'>
                    <h2 className='sh-smartphone-title'>Discover the full smart experience with your smartphone</h2>
                    <p className='sh-smartphone-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar orci nibh, et finibus ipsum efficitur id. Suspendisse ac mauris blandit, dictum orci eget, ornare dui. Pellentesque at ligula imperdiet, consectetur velit non, malesuada metus. Integer id metus vitae est interdum tincidunt sed sit amet nulla.</p>
                    <img className='sh-smartphone-image' src=' /assets/images/smartphone.png' />
                </div>
                <div className='sh-smartphone-quote'>
                    <p className='sh-smartphone-quote_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar orci nibh, et finibus ipsum efficitur id. Suspendisse ac mauris blandit, dictum orci eget, ornare dui. Pellentesque at ligula imperdiet, consectetur velit non, malesuada metus. Integer id metus vitae est interdum tincidunt sed sit amet nulla.</p>
                    <p className='sh-smartphone-quote_author'>Lorem Ipsum</p>
                </div>
            </div>
        </div>;
    }
}
