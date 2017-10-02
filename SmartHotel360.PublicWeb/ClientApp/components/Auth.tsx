import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as UserStore from '../store/User';

type AuthProps =
    UserStore.UserState
    & typeof UserStore.actionCreators;

// TODO: remove any
class Auth extends React.Component<any, {}> {
    public render() {

        return <div className='sh-auth'>
            {!this.props.name
                ? <li>
                    <span className='sh-auth-link' onClick={() => { this.props.login() }}>Login</span>
                </li>

                : <li className='sh-auth-group'>
                    <section className='sh-auth-profile'>
                        <div className='sh-auth-name'>
                            {this.props.name}
                        </div>
                        <span className='sh-auth-link' onClick={() => { this.props.logout() }}>Logout</span>
                    </section>
                    <img className='sh-auth-picture' src={this.props.gravatar} title={ this.props.name } />
                </li>
            }
        </div>;
    }

    public componentDidMount() {
        this.props.init();
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.user, // Selects which state properties are merged into the component's props
    UserStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Auth) as typeof Auth;