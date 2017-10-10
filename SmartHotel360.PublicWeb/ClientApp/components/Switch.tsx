import * as React from 'react';

type SwitchProps = {
    label: string,
    checked?: boolean
}

export default class Switch extends React.Component<SwitchProps, {}> {
    private id = Math.random() + '';

    public render() {
        return <div className='sh-switch'>
            <label className='sh-switch-button'>
                <input type='checkbox' id={this.id} checked={this.props.checked} />
                <span className='sh-switch-slider'></span>
            </label>
            <label className='sh-switch-title' htmlFor={this.id}>{this.props.label}</label>
        </div>
    }
}