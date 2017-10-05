import * as React from 'react';

type SwitchProps = {
    label: string
}

export default class Switch extends React.Component<SwitchProps, {}> {
    public render() {
        return <div className='sh-switch'>
            <label className='sh-switch-button'>
                <input type='checkbox' />
                <span className='sh-switch-slider'></span>
            </label>
            <label className='title'>{this.props.label}</label>
        </div>
    }
}