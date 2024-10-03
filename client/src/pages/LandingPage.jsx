import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LandingPage() {
    return (
        <>
            <div>this is landing page</div>
            <div>this will be modified by Dhanraj... </div>
            <div> I'm just handling it's routes...  </div>

            <NavLink to="login" > Go to Login</NavLink>
            <NavLink to="register" > Go to register</NavLink>

        </>
    );
}
