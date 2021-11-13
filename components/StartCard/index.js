import React, { useEffect, useRef } from 'react'
import { View, Text, Image, Animated } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import styles from './styles'


const index = (props) => {
    const { title, text } = props
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
        }).start()
        return () => {
            console.log('====================================');
            console.log();
            console.log('====================================');
        }
    }, [fadeAnim])

    return (
        <Animated.View style={{
            ...styles.cardStart, opacity: fadeAnim, transform: [{
                translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-250, 0]
                })
            }]
        }} >
            {/* <Image source={require('../../assets/images/imageStart.png')} style={{ ...styles.cardImage, width: 150, height: 150 }} /> */}
            <View style={{ marginTop: 40, alignItems: 'center', justifyContent: 'center', elevation: 50 }}>
                <Image
                    source={
                        require('../../assets/Images/imageStart.png')
                    }
                    style={{
                        width: wp(60), height: wp(60), overflow: 'visible', marginTop: -wp(79.7)
                    }}
                />
                <Text style={styles.cardTitle}>
                    {props.title}
                </Text>
                <Text style={styles.cardText}>
                    {props.text}
                </Text>
            </View>
        </Animated.View >
    )
}

export default index
