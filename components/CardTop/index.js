import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'react-native-elements'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const index = () => {
    return (
        <View style={styles.cardTop}>
            <Image style={styles.cardTopImage} source={require('../../assets/Images/female.png')} />
            <Text style={styles.cardName} > name </Text>
            <Text style={styles.cardAge} > age </Text>
            <View style={styles.contactContainer}>
                <Ionicons name="call" size={24} color="black" style={{ margin: wp('1%') }} />
                <Entypo name="mail" size={26} color="black" style={{ margin: wp('1%') }} />
            </View>
        </View>
    )
}

export default index
