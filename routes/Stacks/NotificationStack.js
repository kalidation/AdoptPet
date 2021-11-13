import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../../screens/NotificationScreen'
import HeaderComponent from '../../components/HeaderComponent'

const Stack = createStackNavigator()

const NotificationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notification" component={NotificationScreen}
                options={{
                    header: (props) => (<HeaderComponent  {...props} left={'back'} headerColor={"#1C3B53"} color={'white'} title={"Notifications"} />)
                }}
            />
        </Stack.Navigator>
    )
}

export default NotificationStack
