import React, { useEffect, useState } from 'react'
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import AppDrawer from './Drawer/AppDrawer'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthStack from './Stacks/AuthStack'
import { firebase } from '../firebase/Firebase'
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { setIsDarkTheme } from '../redux/DarkTheme/DarkTheme.Actions'
import { ToastProvider } from 'react-native-rooster'
import ShowToastProvider from './ShowToastProvider'
import { setUser } from '../redux/Auth/Auth.Actions'


const Routes = (props) => {

    //const [user, setUser] = useState(null)
    const [initializing, setInitializing] = useState(true)

    const { isDarkTheme, setIsDarkTheme, user, setUser } = props

    const onAuthStateChanged = (user) => {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#000',
            text: '#fff'
        }
    }

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

    return (
        <ToastProvider>
            <ShowToastProvider>
                <PaperProvider theme={theme}>
                    <SafeAreaProvider>
                        <NavigationContainer theme={theme}>
                            {user ?
                                <AppDrawer />
                                :
                                <AuthStack />
                            }
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PaperProvider>
            </ShowToastProvider>
        </ToastProvider>
    )
}

const mapStateToProps = (state) => ({
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
    user: state.authReducer.user
})

const mapDispatchToProps = {
    setIsDarkTheme,
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
