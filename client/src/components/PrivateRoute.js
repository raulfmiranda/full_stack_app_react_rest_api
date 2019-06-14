import React from "react";
import { Redirect } from 'react-router-dom';

export function requireAuthentication(Component) {
    return class AuthenticatedComponent extends React.Component {

        isAuthenticated() {
            return this.props.isAuthenticated;
        }

        render() {
            const loginErrorMessage = (
                <Redirect to='/forbidden' />
            );

            return (
                <div>
                    { this.isAuthenticated() === true ? <Component {...this.props} /> : loginErrorMessage }
                </div>
            );
        }
    };
}

export default requireAuthentication;