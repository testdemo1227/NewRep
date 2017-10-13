import * as React from 'react';
import * as $ from 'jquery';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as RoomsStore from '../store/Rooms';

type FilterProps =
    {
        title: string,
        left?: number,
        right?: number,
        disabled?: boolean
    }
    & RoomsStore.RoomsState
    & typeof RoomsStore.actionCreators;

class Filter extends React.Component<FilterProps, {}> {

    private $header: JQuery;
    private $dropdown: JQuery;
    private $filter: JQuery;

    private setStyles = () => {
        return {
            left: this.props.left,
            right: this.props.right
        }
    }

    private toggle = () => {
        if (this.props.disabled) {
            return;
        }

        this.$header.toggleClass('active');
        this.$dropdown.toggleClass('active');
        this.$filter.toggleClass('active');
    }

    private onClickCancel = () => {
        this.close();
    }

    private onClickApply = () => {
        this.props.requestFiltered();
        this.close();
    }

    private close = () => {
        this.$header.removeClass('active');
        this.$dropdown.removeClass('active');
        this.$filter.removeClass('active');
    }
    
    public render() {
        return <div ref='filter' className='sh-filter'>
            <label className='sh-filter-header sh-filter-arrow' ref='header' onClick={this.toggle}>
                <span className='sh-filter-title'>{this.props.title}</span>
                <i className='sh-filter-icon icon-sh-chevron'></i>
            </label>
            <section className='sh-filter-dropdown' ref='dropdown' style={this.setStyles()}>
                <div>
                    {this.props.children}
                </div>
                <ul className='sh-filter-actions'>
                    <li className='sh-filter-button sh-filter-button--cancel' onClick={this.onClickCancel}>Cancel</li>
                    <li className='sh-filter-button sh-filter-button--apply' onClick={this.onClickApply}>Apply</li>
                </ul>
            </section>
        </div>;
    }

    public componentDidMount() {
        this.$header = $(this.refs.header);
        this.$dropdown = $(this.refs.dropdown);
        this.$filter = $(this.refs.filter);
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.rooms, // Selects which state properties are merged into the component's props
    RoomsStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Filter) as any;