import React, { useRef, useEffect } from 'react'
import { View, Text, Image, StatusBar, Animated, SafeAreaView, Easing } from 'react-native'
import styles from './styles'
import { TouchableOpacity } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { lunch } from '../../redux/FirstLunch/FirstLunch.actions'
import StartCard from '../../components/StartCard'

const index = (props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current

    const { navigation, lunch } = props

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
        }).start()
        return () => {
        }
    }, [fadeAnim])

    const getStart = () => {
        navigation.navigate("Login")
        lunch()
    }

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Animated.View style={{
                ...styles.topContainer, opacity: fadeAnim, transform: [{
                    translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-250, 0]
                    })
                }]
            }}>
                <StartCard title={'Welcome'} text={'Find the best pet near you and adopt your favorite one'} />
            </Animated.View>
            <Animated.View style={{
                ...styles.bottomContainer, opacity: fadeAnim, transform: [{
                    translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [250, 0]
                    })
                }]
            }}>
                <Text style={{ color: "white", elevation: 15, fontSize: heightPercentageToDP(3.6) }} >
                    Stay Connected With your Pets !
                </Text>
                <Text style={{ color: "#999", elevation: 15, fontSize: heightPercentageToDP(1.75) }}> Go And Create Account </Text>
                <TouchableOpacity style={styles.buttonSplash} onPress={() => getStart()} >
                    <Text style={{ color: "black" }} > Get Started </Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    isLunching: state.firstLunchReducer.isLunching,
    alreadyLunched: state.firstLunchReducer.alreadyLunched,
    error: state.firstLunchReducer.error,
    errorMessage: state.firstLunchReducer.errorMessage
})

const mapDispatchToProps = {
    lunch,
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
