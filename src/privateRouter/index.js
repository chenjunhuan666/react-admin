import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps => (
                true ? <Component {...routeProps} /> : <Redirect to='/'/>
            )}
        />
    );
}

export default PrivateRouter