import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ProfilScreen from '../../screens/ProfilScreen'
import HeaderComponent from '../../components/HeaderComponent'

const Stack = createStackNavigator()

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" >
            <Stack.Screen name="Profile" component={ProfilScreen} options={{
                header: (props) => <HeaderComponent
                    {...props}
                    left={'hamburger'}
                    color={'white'}
                    title={'Your Profil'}
                    headerColor={"#0b3a45"}
                />
            }} />
        </Stack.Navigator>
    )
}

export default ProfileStack
