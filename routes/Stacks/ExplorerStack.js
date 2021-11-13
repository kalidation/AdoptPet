import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ExplorerScreen from '../../screens/ExplorerScreen'
import HeaderComponent from '../../components/HeaderComponent'
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import AdoptPetScreen from '../../screens/AdoptPetScreen'
import { useTheme } from '@react-navigation/native';


const Stack = createStackNavigator()

const ExplorerStack = ({ navigation }) => {

    const theme = useTheme()

    return (
        <Stack.Navigator initialRouteName="Explorer" >
            <Stack.Screen name="Explorer" component={ExplorerScreen} options={{
                headerTransparent: true,
                headerRight: () =>
                    <Ionicons name="list-sharp"
                        size={28}
                        color={theme.dark ? "white" : "black"}
                        style={{ marginEnd: 30 }}
                        onPress={() => navigation.navigate('Adopter')}
                    />,
                headerLeft: () =>
                    <Ionicons
                        name="ios-arrow-back"
                        size={28}
                        color={theme.dark ? "white" : "black"}
                        style={{ marginStart: 30 }}
                        onPress={() => navigation.goBack()}
                    />,
                headerTitle: ''
            }} />
        </Stack.Navigator>
    )
}

export default ExplorerStack
