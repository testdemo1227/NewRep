import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Loading from './Loading';
import * as RoomsStore from '../store/Rooms';
import { RoomHighlighted } from './RoomHighlighted';

type RoomsProps =
    {
        component: any,
        source?: any,
        title?: string,
        modifier?: string
    }
    & RoomsStore.RoomsState
    & typeof RoomsStore.actionCreators;

class Rooms extends React.Component<RoomsProps, {}> {
    public componentDidMount() {
        if (this.props.source === RoomsStore.Sources.Featured) {
            this.props.requestFeatured();
            return;
        }

        this.props.requestFiltered()
    }
    public render() {
        
        return <div className={'sh-rooms ' + (this.props.modifier ? `sh-rooms--${this.props.modifier}` : '')}>
            <span className='sh-rooms-title'>{this.props.title}</span>
            {this.props.isLoading
                ? <Loading />
                :
                this.props.list.map((room: any, key: any) =>
                    <div className='sh-rooms-item' key={key}>
                        {React.createElement(this.props.component, Object.assign({}, this.props, {...room }))}
                    </div>
                )
            }
        </div>;
    }
}

// wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.rooms, // Selects which state properties are merged into the component's props
    RoomsStore.actionCreators                 // selects which action creators are merged into the component's props
)(Rooms) as any;