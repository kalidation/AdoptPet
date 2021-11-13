import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SavedPetScreen from '../../screens/SavedPetScreen'
import DetailScreen from '../../screens/DetailScreen'
import HeaderComponent from '../../components/HeaderComponent'
import { enableScreens } from 'react-native-screens'
enableScreens()

const Stack = createStackNavigator()

const SavedPetStack = () => {
    return (
        <Stack.Navigator initialRouteName="Saved" >
            <Stack.Screen name="Saved" component={SavedPetScreen} options={{
                header: (props) => <HeaderComponent
                    {...props}
                    left={'hamburger'}
                    headerColor={'transparent'}
                    color={'white'}
                    title={'Your Profil'}
                    headerColor={"#659999"}
                />
            }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{
                gestureEnabled: false,
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 2500, delay: 100 } },
                    close: { animation: 'timing', config: { duration: 1500, delay: 100 } }
                },
                cardStyleInterpolator: ({ current: { progress } }) => {
                    return {
                        cardStyle: {
                            opacity: progress
                        }
                    }
                },
                header: (props) => <HeaderComponent
                    {...props}
                    left={'hamburger'}
                    headerColor={'transparent'}
                    color={'white'}
                    title={'Your Profil'}
                    headerColor={"#659999"}
                />
            }} />
        </Stack.Navigator>
    )
}

export default SavedPetStack
