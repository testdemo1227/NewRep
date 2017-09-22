import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='sh-site'>
            <header>
                <NavMenu />
            </header>
            <section className='sh-content'>
                { this.props.children }
            </section>
            <Footer />
        </div>;
    }
}
