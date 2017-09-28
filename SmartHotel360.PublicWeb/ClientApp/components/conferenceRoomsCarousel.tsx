import * as React from 'react';

export class ConferenceRoomsCarousel extends React.Component<{}, {}> {
    private rooms = [
        {
            title: 'Book a smart conference room',
            imageUrl: '/assets/images/conference_room_1.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
        },
        {
            title: 'Smart room automatic adaptation',
            imageUrl: '/assets/images/conference_room_2.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
        },
        {
            title: 'Person recognition',
            imageUrl: '/assets/images/conference_room_3.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
        },
        {
            title: 'Personalize room',
            imageUrl: '/assets/images/conference_room_4.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor libero, varius ac.'
        }
    ];

    private setBackgroundImage(image: string): any {
        return {
            'background-image': `url(${image})`,
        }
    }
    public render() {
        return <div className='sh-conference_rooms'>            
            <div className='sh-conference_rooms-carousel'>
                {this.rooms.map((col, j) =>
                    <article key={j} className='sh-conference_rooms-wrapper'>
                        <div className='sh-conference_rooms-image' style={this.setBackgroundImage(col.imageUrl)}></div>
                        <div className='sh-conference_rooms-box'>
                            <span className='sh-conference_rooms-title'>
                                {col.title}
                            </span>
                            <span className='sh-conference_rooms-text'>
                                {col.description}
                            </span>
                        </div>
                    </article>
                )}
            </div>
            <button className='btn sh-conference_rooms-button'>Find a conference room</button>
        </div>;
    }
}