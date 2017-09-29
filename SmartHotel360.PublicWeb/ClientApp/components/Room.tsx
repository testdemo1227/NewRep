import * as React from 'react';
import * as RoomsStore from '../store/Rooms';

export default class Room extends React.Component<RoomsStore.Room, {}> {
    private setBackgroundImage(image: string): {[key: string]: string} {
        return {
            backgroundImage: `url(${image})`
        };
    }

    protected navigationButtons(): JSX.Element {
        return (<span></span>)
    }

    public render() {
        return <div className='sh-room'>
            <header className='sh-room-header'>
                <div className='sh-room-image' style={this.setBackgroundImage(this.props.image)}></div>
                {this.navigationButtons()}
            </header>
            <article className='sh-room-info'>
                <div className='sh-room-column sh-room-column--left'>
                    <span className='sh-room-title sh-room-row'>{this.props.title}</span>
                    <span className='sh-room-text'>{this.props.city}</span>
                </div>
                <div className='sh-room-column sh-room-column--right'>
                    <div className='sh-room-row'>
                        <span className='sh-room-price'>{this.props.currency}{this.props.price}/</span>
                        <span className='sh-room-label'>Night</span>
                    </div>
                    <span className='sh-room-stars'>
                        <i className='glyphicon glyphicon-star sh-room-star active'></i>
                        <i className='glyphicon glyphicon-star sh-room-star active'></i>
                        <i className='glyphicon glyphicon-star sh-room-star active'></i>
                        <i className='glyphicon glyphicon-star sh-room-star'></i>
                        <i className='glyphicon glyphicon-star sh-room-star'></i>
                    </span>
                </div>
            </article>
        </div>
    };
}