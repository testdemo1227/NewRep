import * as React from 'react';
import { NavLink, Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

export class NavMenu extends React.Component<any, {}> {
    private isHome(): boolean {
        const location = this.props.location;
        return location.pathname === '/';
    }
    public render() {
        return <div className={`sh-nav_menu ${this.isHome() ? 'is-home' : ''}`}>
            <Link to={'/'}>
                <img className={`sh-nav_menu-logo ${this.isHome() ? 'is-home' : ''}`} src='/assets/images/logo.svg' />
            </Link>
        </div>;
    }
}