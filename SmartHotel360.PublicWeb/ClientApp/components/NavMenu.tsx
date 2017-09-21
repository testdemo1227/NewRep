import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
   
    public render() {
        return <div className='main-nav'>
            <div className='sh-navMenu'>
                <div className='navbar-header sh-navMenu-brand'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>SmartHotel360.PublicWeb</Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink exact to={'/'} activeClassName='active'>
                                The smart experience
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/counter'} activeClassName='active'>
                                Rooms
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/fetchdata'} activeClassName='active'>
                               Conference rooms
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/fetchdata'} activeClassName='active'>
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
