import React from 'react'
import DetailScreen from '../../screens/DetailScreen'
import { createStackNavigator } from '@react-navigation/stack';
import HeaderComponent from '../../components/HeaderComponent'


const Stack = createStackNavigator()

const DetailStack = () => {
    return (
        <Stack.Navigator headerMode='screen' initialRouteName={"Detail"}>
            <Stack.Screen name={"Details"} component={DetailScreen}
                options={{
                    header: (props) =>
                    (
                        <HeaderComponent {...props} left={'back'} headerColor={"#0D2F41"} color={'white'} title={"Details"} />
                    )
                }}
            />
        </Stack.Navigator>
    )
}

export default DetailStack
