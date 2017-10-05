import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as $ from 'jquery';

type FilterProps = {
    title: string,
    id: string,
    left?: number,
    right?: number
}

export default class Filter extends React.Component<FilterProps, {}> {
    private setStyles = () => {
        return {
            left: this.props.left,
            right: this.props.right
        }
    }

    private toggle = () => {
        $(`#${this.props.id} .sh-filter-header`).toggleClass('active');
        $(`#${this.props.id} .sh-filter-dropdown`).toggleClass('active');
    }

    private close = () => {
        console.log('focus');
        $(`#${this.props.id} .sh-filter-header`).removeClass('active');
        $(`#${this.props.id} .sh-filter-dropdown`).removeClass('active');
    }
    
    public render() {
        return <div className='sh-filter' id={this.props.id}>
            <label className='sh-filter-header sh-filter-arrow' onClick={this.toggle}>
                <span className='sh-filter-title'>{this.props.title}</span>
                <i className='sh-filter-icon icon-sh-chevron'></i>
            </label>
            <section className='sh-filter-dropdown' style={this.setStyles()}>
                <div>                
                    {this.props.children}
                </div>   
                <ul className='sh-filter-actions'>
                    <li className='sh-filter-button sh-filter-button--cancel'>Cancel</li>
                    <li className='sh-filter-button sh-filter-button--apply'>Apply</li>
                </ul>
            </section>
        </div>;
    }
}