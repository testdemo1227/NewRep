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
        return <div className={`sh-navMenu ${this.isHome() ? 'sh-navMenu--home' : ''}`}>
            <div className={`sh-navMenu-wrapper`}>
                <div className='navbar-header sh-navMenu-header'>
                    <button type='button' className='sh-navMenu-toogle navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse' hidden>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>SmartHotel360.PublicWeb</Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav sh-navMenu-nav'>
                        <li>
                            <NavLink exact to={'/smartExperience'} activeClassName='active'>
                                The smart experience
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/rooms'} activeClassName='active'>
                                Rooms
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/conferenceRooms'} activeClassName='active'>
                                Conference rooms
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/login'} activeClassName='active'>
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}