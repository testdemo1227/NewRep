import * as React from 'react';

type FilterRatingProps = {
    rating: number
}

export default class FilterRating extends React.Component<FilterRatingProps, {}> {
    private drawStars(rating = 5): JSX.Element[] {
        const max = 5;
        let stars = [];

        for (let i = 0; i < max; i++) {
            if (i < rating) {
                stars.push(<i className='glyphicon glyphicon-star sh-filter_rating-star active' key={i}></i>);
            } else {
                stars.push(<i className='glyphicon glyphicon-star sh-filter_rating-star' key={i}></i>);
            }
        }

        return stars;
    }

    public render() {
        return <div className='sh-filter_rating'>
            {this.drawStars(this.props.rating)}
        </div>
    }
}