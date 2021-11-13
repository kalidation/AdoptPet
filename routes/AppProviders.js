import React, { useState, createContext } from 'react'
import * as Location from 'expo-location';

export const AppContext = createContext()

const AppProviders = ({ children }) => {

    const [location, setLocation] = useState(null)

    const getLocation = async () => {
        const { status: existingStatus } = await Location.getPermissionsAsync();
        if (existingStatus !== 'granted') {
            alert('Getting new permission')
            const { status: newStatus } = await Location.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('No location permissions');
                throw new Error('No location permissions')
            }
        }
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation })
        setLocation(location)
    }

    return (
        <AppContext.Provider
            value={{
                location, setLocation,
                getLocation: async () => {
                    try {
                        getLocation()
                    } catch (error) {
                        console.log(error);
                    }
                }
            }}
        >
            {children}
        </AppContext.Provider>
    )

}

export default AppProviders