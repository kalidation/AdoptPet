import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useContext, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import CardBot from '../../components/CardBot'
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native-elements'
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native'
import { TouchableHighlight } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { connect } from 'react-redux'
import { AppContext } from '../../routes/AppProviders'


const index = ({ navigation, isDarkTheme }) => {

    const [lastPet, setlastPet] = useState([])
    const { colors } = useTheme();
    const { location, setLocation } = useContext(AppContext)
    const { getLocation } = useContext(AppContext)


    useEffect(() => {
        getLocation()
        console.log(location);
        return () => {

        }
    }, [])


    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#082732" />
            {/* <Text style={styles.titleOne} >Adopt</Text>
            <Text style={styles.subTitleOne} >Your favorite animal</Text> */}
            <View style={{ height: hp(20) }}>
                <LottieView source={require('../../assets/Lottie/catLong.json')} autoPlay loop />
            </View>
            <TouchableOpacity
                style={{ alignSelf: 'center', marginTop: -widthPercentageToDP(4) }}
                onPress={() => navigation.navigate("Adopter")}
            >
                <CardBot colors={["#0F2027", "#203A43", "#2C5364"]} title={'Adopt Pet'} source={require('../../assets/Images/adopt.png')} isDarkTheme={isDarkTheme} />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ alignSelf: 'center', marginTop: hp(2) }}
                onPress={() => navigation.navigate("Signal")}
            >
                <CardBot isDarkTheme={isDarkTheme} colors={["#2C5364", "#203A43", "#0F2027"]} title={'Signal Pet'} source={require('../../assets/Images/signal.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: hp(2), height: '20%' }}
                onPress={() => navigation.navigate("Give")}
            >
                <CardBot isDarkTheme={isDarkTheme} colors={["#203A43", "#2C5364", "#0F2027"]} title={'Give Pet'} source={require('../../assets/Images/adopt.png')} />
            </TouchableOpacity>
            <View style={styles.cardsContainer}>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(index)
