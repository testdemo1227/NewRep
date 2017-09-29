import * as React from 'react';
import Room from './Room';

export class RoomHighlighted extends Room {

    public navigationButtons(): JSX.Element {
        return (
            <div className='sh-room-button'>
                <div className='sh-room-button'>
                    {this.props.type}
                </div>
            </div>
        )
    }
}