
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Slider, { Range } from 'rc-slider';

type FilterPriceState = {
    minPrice: number,
    maxPrice: number
}

//TODO: add store
export default class FilterPrice extends React.Component<{}, FilterPriceState> {

    constructor() {
        super();
        this.state = {
            minPrice: 0,
            maxPrice: 1000
        }
    }

    public applyFilter = () => {
        let title = `$${this.state.minPrice} - $${this.state.maxPrice}`;
    }

    private buildTitle(): string {
        return `$${this.state.minPrice} - $${this.state.maxPrice}`;
    }

    private onSliderChange = (value: Array<number>) => {
        this.setState({ minPrice: value[0], maxPrice: value[1] });
    }

    public render() {
        const min = 0,
            max = 1000;
        return <div className='sh-filter_price'>
            <div className='sh-filter_price-range'>
                <span className='sh-filter_price-value'>$ {this.state.minPrice}</span>
                <span className='sh-filter_price-value'>$ {this.state.maxPrice}</span>
            </div>
            <Range min={min} max={max} defaultValue={[0, 1000]} tipFormatter={value => `$${value}`} onChange={value => this.onSliderChange(value)} />
        </div>;
    }
}
