import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { SignUp } from './SignUp'
import { SignIn } from './SignIn'
import { NotFound } from './NotFound'
import { Dashboard } from './Dashboard'
import { DetailsPage } from './DetailsPage'
import { PrivateRoute } from './PrivateRoute'

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/dashboard' element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />
            <Route path='/userId/:UserId' element={<DetailsPage />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
