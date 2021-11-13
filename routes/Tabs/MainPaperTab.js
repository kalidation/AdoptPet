import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
// import HomeStack from '../Stacks/HomeStack';
// import DetailStack from '../Stacks/DetailStack';
// import NotificationStack from '../Stacks/NotificationStack';

import HomeScreen from '../../screens/HomeScreen'
import NotificationScreen from '../../screens/NotificationScreen'
import DetailScreen from '../../screens/DetailScreen'

import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ratio } from '../../shared/ratio';

const MainPaperTab = () => {

    const [index, setIndex] = useState(1);
    const [routes] = useState([
        { key: 'HomeStack', title: 'Home', color: 'red' },
        { key: 'DetailStack', title: 'Details', color: 'blue' },
        { key: 'NotificationStack', title: 'Notification', color: 'pink' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        HomeStack: HomeScreen,
        DetailStack: NotificationScreen,
        NotificationStack: DetailScreen,
    });

    const renderIcon = ({ route, focused, color }) => {
        switch (route.key) {
            case "HomeStack":
                return (
                    focused ?
                        <Entypo name="home" size={ratio * 48} color={color} /> :
                        <AntDesign name="home" size={ratio * 48} color={color} />
                )
            case "DetailStack":
                return (
                    focused ?
                        <MaterialIcons name="details" size={ratio * 48} color={color} /> :
                        <MaterialCommunityIcons name="details" size={ratio * 48} color={color} />
                )

            case "NotificationStack":
                return (
                    focused ?
                        <Ionicons name="notifications-outline" size={ratio * 48} color={color} /> :
                        <Ionicons name="notifications" size={ratio * 48} color={color} />
                )
            default:
                <Entypo name="home" size={ratio * 48} color={color} />
                break;
        }
    }

    return (
        <BottomNavigation
            activeColor={"black"}
            shifting={true}
            navigationState={{ index, routes }}
            onIndexChange={(index) => setIndex(index)}
            renderScene={renderScene}
            renderIcon={renderIcon}
            sceneAnimationEnabled={true}
        />
    )
}

export default MainPaperTab
