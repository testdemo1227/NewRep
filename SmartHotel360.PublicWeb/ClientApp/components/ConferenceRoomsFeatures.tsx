import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ConferenceRoomsFeaturesStore from '../store/ConferenceRoomsFeatures';

type ConferenceRoomsFeaturesProps =
    ConferenceRoomsFeaturesStore.FeaturesState
    & typeof ConferenceRoomsFeaturesStore.actionCreators;

// TODO: remove any
class ConferenceRoomsFeatures extends React.Component<any, {}> {
    public componentDidMount() {
       this.props.request();
    }

    private setBackgroundImage(image: string): any {
        return {
            backgroundImage: `url(${image})`,
        }
    }
    public render() {
        return <div className='sh-rooms_feature'>    
            <ul className='sh-rooms_feature-carousel'>
                {this.props.list.map((feature: any, key: any) =>
                    <li key={key} className='sh-rooms_feature-wrapper'>
                        <div className='sh-rooms_feature-image' style={this.setBackgroundImage(feature.imageUrl)}></div>
                        <div className='sh-rooms_feature-box'>
                            <span className='sh-rooms_feature-title'>
                                {feature.title}
                            </span>
                            <span className='sh-rooms_feature-text'>
                                {feature.description}
                            </span>
                        </div>
                    </li>
                )}
            </ul>
           
            <button className='sh-rooms_feature-button btn'>Find a conference room</button>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.conferenceRoomsFeatures, // Selects which state properties are merged into the component's props
    ConferenceRoomsFeaturesStore.actionCreators                 // Selects which action creators are merged into the component's props
)(ConferenceRoomsFeatures) as typeof ConferenceRoomsFeatures;