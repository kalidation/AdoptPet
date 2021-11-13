import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ratio } from '../../shared/ratio';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const index = (props) => {
    const { left, right, color, title, navigation, headerColor, scene } = props
    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: headerColor }}>
            {/* <LinearGradient
                colors={colors}
                style={styles.container}
                start={[0, 0]}
                end={[1, 1]}
            >
            </LinearGradient> */}
            <StatusBar style={'auto'} animated={true} />
            <Text style={styles.headerTitle}>{title}</Text>
            {left === undefined ? null :
                scene.route.name === "Home" || scene.route.name === "Profile" || scene.route.name === "Saved" ?
                    <FontAwesome5 onPress={() => navigation.toggleDrawer()} name={left} style={styles.left} name={left} size={ratio * 48} color={color} /> :
                    <AntDesign onPress={() => navigation.goBack()} style={styles.left} name={left} size={ratio * 48} color={color} />

            }
            {right === undefined ? null :
                <MaterialCommunityIcons onPress={() => navigation.navigate("Explorer")} style={styles.right} name={right} size={ratio * 48} color={color} />
            }
        </SafeAreaView>
    )
}



export default index
