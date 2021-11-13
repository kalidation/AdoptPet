import React from 'react'
import AppProviders from './AppProviders'
import Routes, { } from './Routes'

const index = () => {
    return (
        <AppProviders>
            <Routes />
        </AppProviders>
    )
}

export default index
