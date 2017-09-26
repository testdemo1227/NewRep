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
                </div>
            </div>
        </div>;
    }
}
