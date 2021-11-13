import React from 'react'
import HomeStack from '../Stacks/HomeStack';
import DetailStack from '../Stacks/DetailStack';
import NotificationStack from '../Stacks/NotificationStack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ratio } from '../../shared/ratio';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createMaterialBottomTabNavigator()



const MainTab = ({ navigation, route }) => {


    return (
        <Tab.Navigator
            labeled={true}
            backBehavior={'initialRoute'}
            shifting={true}
            activeColor={"white"}
            initialRouteName={"HomeStack"}
            screenOptions={({ route }) => ({
                tabBarColor: route.name === "HomeStack" ? "#082732" :
                    route.name === "DetailStack" ? "#0D2F41" :
                        route.name === "NotificationStack" ? "#1C3B53" : "grey",
            })}
        >
            <Tab.Screen name="DetailStack" component={DetailStack}
                options={{
                    tabBarLabel: "Details",
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <MaterialIcons name="details" size={ratio * 48} color={color} /> :
                            <MaterialCommunityIcons name="details" size={ratio * 48} color={color} />
                    )
                }}
            />
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={({ route }) => ({
                    tabBarLabel: null,
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={styles.homeIconActive}>
                                <Entypo name="home" size={ratio * 80} color={'#5eb5ab'} />
                                <Text style={{ marginTop: -5, color: '#5eb5ab', fontSize: ratio * 22 }}>Home</Text>
                            </View> :
                            <View style={styles.homeIconDisable}>
                                <AntDesign name="home" size={ratio * 65} color={color} />
                            </View>
                    )
                })}
            />
            <Tab.Screen name="NotificationStack" component={NotificationStack}
                options={{
                    tabBarLabel: "Notifications",
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Ionicons name="notifications" size={ratio * 48} color={color} /> :
                            <Ionicons name="notifications-outline" size={ratio * 48} color={color} />
                    )
                }}
            />
            {/* <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Entypo name="home" size={ratio * 48} color={color} /> :
                            <AntDesign name="home" size={ratio * 48} color={color} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    )
}

export default MainTab

const styles = StyleSheet.create({
    homeIconActive: {
        elevation: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: -hp(2.5)
    },
    homeIconDisable: {
        elevation: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50, height: 50,
        position: 'absolute',
        bottom: -hp(1.5)
    }
})