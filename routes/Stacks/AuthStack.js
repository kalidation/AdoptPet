import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import SplashScreen from '../../screens/SplashScreen'
import HeaderComponent from '../../components/HeaderComponent'
import { lunch } from '../../redux/FirstLunch/FirstLunch.actions'

const Stack = createStackNavigator()

const AuthStack = (props) => {

    let routeName;
    if (props.alreadyLunched === null) {
        return null
    } else if (props.alreadyLunched === true) {
        routeName = "Login"
    } else {
        routeName = 'Splash'
    }

    return (
        <Stack.Navigator initialRouteName={routeName} >
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{
                header: (props) => <HeaderComponent  {...props} left={'back'} headerColor={"#1b4f49"} colors={["#0f0c29", "#302b63", "#24243e"]} color={"white"} title={"Register"} />
            }} />
        </Stack.Navigator>
    )
}

const mapStateToProps = (state) => ({
    isLunching: state.firstLunchReducer.isLunching,
    alreadyLunched: state.firstLunchReducer.alreadyLunched,
    error: state.firstLunchReducer.error,
    errorMessage: state.firstLunchReducer.errorMessage
})

const mapDispatchToProps = {
    lunch,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthStack)
