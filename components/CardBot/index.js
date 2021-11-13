import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Image } from 'react-native'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const index = (props) => {
    // <Image source={require('../../assets/images/dogCardOne.png')} style={styles.cardImageBot} />
    return (
        <LinearGradient style={{ ...styles.cardBotContainer, elevation: props.isDarkTheme ? 0 : 50, borderColor: 'white', borderWidth: 1 }} colors={props.colors} start={[0, 0]} end={[1, 0]}>
            <View style={{ ...styles.cardViewDetails, elevation: 50 }}>
                <Text style={{ ...styles.title, color: 'white', elevation: 50 }}> {props.title} </Text>
            </View>
            <Image style={{ ...styles.cardImageBot, overflow: 'visible', marginTop: -hp(4), marginStart: hp(3) }} source={props.source} />
        </LinearGradient>
    )
}

export default index
