import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import styles from './styles'
import { Ionicons, Entypo, Foundation } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import qs from 'qs'
import { Linking, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import { savePet } from '../../redux/PetSaved/Action';
import { SharedElement } from 'react-navigation-shared-element';



const index = (props) => {
    const { item, isDarkTheme, savePet, petSaved, index, scrollY, navigation } = props
    const { colors } = useTheme()
    const [isBookMark, setIsBookMark] = useState(false)

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)


    const inputRange = [
        -1,
        0,
        (hp(15) + 10 + 10 + 10 + hp(0.5)) * index,
        (hp(15) + 10 + 10 + 10 + hp(0.5)) * (index + 2)
    ]

    const opacityInputRange = [
        -1,
        0,
        (hp(15) + 10 + 10 + 10 + hp(0.5)) * index,
        (hp(15) + 10 + 10 + 10 + hp(0.5)) * (index + 0.5)
    ]

    const scale = scrollY.interpolate({
        inputRange,
        outputRange: [1, 1, 1, 0]
    })

    const opacity = scrollY.interpolate({
        inputRange: opacityInputRange,
        outputRange: [1, 1, 1, 0]
    })

    const getObjectEquivalent = (petSaved, item) => {
        let iMax = petSaved.length
        for (var i = 0; i < iMax; i++) {
            if (isEquivalent(petSaved[i], item)) {
                setIsBookMark(true)
                return true
            }
        }
        setIsBookMark(false)
        return false
    }

    const isEquivalent = (a, b) => {
        let aProps = Object.getOwnPropertyNames(a)
        let bProps = Object.getOwnPropertyNames(b)

        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }

    const sendEmail = async (to, subject, body) => {

        let url = `mailto:${to}`

        const query = qs.stringify({
            subject: subject,
            body: body,
        });

        if (query.length) {
            url += `?${query}`;
        }

        const canOpen = await Linking.canOpenURL(url);

        if (!canOpen) {
            throw new Error('Provided URL can not be handled')
        }

        return Linking.openURL(url)

    }

    useEffect(() => {
        getObjectEquivalent(petSaved, item)
        return () => {

        }
    }, [])


    return (
        <AnimatedTouchable
            style={{
                ...styles.cardBotContainer,
                backgroundColor: isDarkTheme ? '#222' : 'white', borderWidth: isDarkTheme ? 0.5 : 0,
                borderColor: isDarkTheme ? 'white' : null,
                transform: [{ scale }],
                opacity
            }}
            onPress={() => navigation.push('Detail', { index: index, item: item })}
        >
            <View style={{ ...styles.cardViewDetails }}>
                {item != null ?
                    item.sexe === 'Female' ?
                        <View style={{ marginTop: '1%', flexDirection: 'row' }}>
                            <SharedElement id={`item.${index}.petName`}>
                                <Text style={{ ...styles.cardName, color: colors.text, marginEnd: wp(2) }} >{item.petName}</Text>
                            </SharedElement>
                            <Foundation name="female-symbol" size={22} color={isDarkTheme ? "white" : "black"} style={{ alignSelf: 'center' }} />
                        </View>
                        :
                        <View style={{ marginTop: '1%', flexDirection: 'row' }}>
                            <SharedElement id={`item.${index}.petName`}>
                                <Text style={{ ...styles.cardName, color: colors.text, marginEnd: wp(2) }} >{item.petName}</Text>
                            </SharedElement>
                            <Foundation name="male-symbol" size={22} color={isDarkTheme ? "white" : "black"} style={{ alignSelf: 'center' }} />
                        </View>
                    //   item.petName
                    : null
                }
                <SharedElement id={`item.${index}.age`}>
                    <Text style={{ ...styles.cardAge, color: colors.text }} >{item != null ? item.age + ' years Old' : null}</Text>
                </SharedElement>
                <View style={styles.cardBotContactContainer}>
                    <Ionicons
                        style={{ marginEnd: '6%' }}
                        name="call"
                        size={24}
                        color={isDarkTheme ? "white" : "black"}
                        onPress={() => {
                            alert('labas')
                        }}
                    />
                    <Entypo
                        name="mail"
                        size={26}
                        color={isDarkTheme ? "white" : "black"}
                        onPress={() => {
                            try {
                                sendEmail('kalidation@gmail.com', 'demande contact pour adoption', 'baliz')
                            } catch (error) {
                                alert(error)
                            }
                        }}
                    />
                    <Ionicons
                        style={{ marginStart: wp(25) }}
                        name={isBookMark ? "md-bookmark" : "bookmark-outline"} size={24}
                        color={isDarkTheme ? "white" : "black"}
                        onPress={() => {
                            savePet(item)
                        }} />
                </View>
            </View>
            <SharedElement style={styles.cardImageBot} id={`item.${index}.image`}>
                <Image style={{ ...styles.cardImageBot, overflow: 'visible', width: '100%' }} source={{ uri: item != null ? item.image : null }} />
            </SharedElement>
        </AnimatedTouchable>
    )
}



const mapStateToProps = (state) => ({
    petSaved: state.savedPetReducer.petSaved,
})

const mapDispatchToProps = {
    savePet,
}


export default connect(mapStateToProps, mapDispatchToProps)(index)
