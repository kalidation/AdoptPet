import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen'
import HeaderComponent from '../../components/HeaderComponent';
import GivPetScreen from '../../screens/GivPetScreen';
import SignalPetScreen from '../../screens/SignalPetScreen';
import AdoptPetScreen from '../../screens/AdoptPetScreen';
import ExplorerScreen from '../../screens/ExplorerScreen'

const Stack = createStackNavigator()

const HomeStack = () => {
    // <Stack.Screen name={"Details"} component={DetailScreen} options={{
    //     header: (props) => (<HeaderComponent  {...props} left={'back'} right={'ios-settings'} color={'black'} title={"Details"} />)
    // }} />
    return (
        <Stack.Navigator headerMode='screen' initialRouteName="Home">
            <Stack.Screen name={"Home"} component={HomeScreen} options={{
                header: (props) => (
                    <HeaderComponent  {...props} left={'hamburger'} right={'google-maps'} headerColor={"#082732"} colors={["#0F2027", "#203A43", "#2C5364"]} color={"white"} title={"Home"} />
                ),
            }} />
            <Stack.Screen name={"Adopter"} component={AdoptPetScreen} options={{
                header: (props) => (
                    <HeaderComponent  {...props} left={'back'} headerColor={"#082732"} colors={["#0f0c29", "#302b63", "#24243e"]} color={"white"} title={"Adopt Pet"} />
                )
            }} />
            <Stack.Screen name={"Signal"} component={SignalPetScreen} options={{
                header: (props) => (
                    <HeaderComponent  {...props} left={'back'} headerColor={"#082732"} colors={["#0f0c29", "#302b63", "#24243e"]} color={"white"} title={"Signal Pet"} />
                )
            }} />
            <Stack.Screen name={"Give"} component={GivPetScreen} options={{
                header: (props) => (
                    <HeaderComponent  {...props} left={'back'} headerColor={"#082732"} colors={["#0f0c29", "#302b63", "#24243e"]} color={"white"} title={"Give Pet"} />
                )
            }} />
            {/* <Stack.Screen name={"Explorer"} component={ExplorerScreen} options={{
                header: (props) => (
                    <HeaderComponent  {...props} left={'back'} headerColor={"#082732"} colors={["#0f0c29", "#302b63", "#24243e"]} color={"white"} title={"Explore Pets"} />
                ),
            }} /> */}
        </Stack.Navigator>
    )
}

export default HomeStack

