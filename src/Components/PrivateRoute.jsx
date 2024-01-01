import React from 'react'
import { SignIn } from './SignIn'
import { Dashboard } from './Dashboard'

export const PrivateRoute = () => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
        return <SignIn />
    } else {
       
        return <Dashboard />
    }

}
