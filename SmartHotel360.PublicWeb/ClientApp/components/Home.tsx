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
            <div className='sh-home-smartphone'>
                <div className='sh-home-smartphone_wrapper'>
                    <h2 className='sh-home-smartphone_title'>Discover the full smart experience with your smartphone</h2>
                    <p className='sh-home-smartphone_description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar orci nibh, et finibus ipsum efficitur id. Suspendisse ac mauris blandit, dictum orci eget, ornare dui. Pellentesque at ligula imperdiet, consectetur velit non, malesuada metus. Integer id metus vitae est interdum tincidunt sed sit amet nulla.</p>
                    <img className='sh-home-smartphone_image' src=' /assets/images/smartphone.png' />
                </div>
                <div className='sh-home-smartphone_quote'>
                    <p className='sh-home-smartphone_quote_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar orci nibh, et finibus ipsum efficitur id. Suspendisse ac mauris blandit, dictum orci eget, ornare dui. Pellentesque at ligula imperdiet, consectetur velit non, malesuada metus. Integer id metus vitae est interdum tincidunt sed sit amet nulla.</p>
                    <p className='sh-home-smartphone_quote_author'>Lorem Ipsum</p>
                </div>
            </div>
        </div>;
    }
}
