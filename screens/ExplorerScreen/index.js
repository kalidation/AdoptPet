import React, { useContext, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Animated } from 'react-native';
import { connect } from "react-redux";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AppContext } from '../../routes/AppProviders';
import styles from './styles';
import { Ionicons, Fontisto, AntDesign, MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { useTheme } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import { data, mapDarkStyle, mapStandardStyle, types } from './mapData';
import { Svg, Image as ImageSvg } from 'react-native-svg';

const index = (props) => {

    const { isDarkTheme } = props;
    const { colors } = useTheme()
    const { location } = useContext(AppContext)
    const _map = useRef(null);
    const _scrollView = useRef(null)

    let mapIndex = 0
    let scrollX = new Animated.Value(0)

    useEffect(() => {
        scrollX.addListener(({ value }) => {
            let index = Math.floor(value / wp(80) + 0.3)
            if (index >= data.length) {
                index = data.length - 1
            }
            if (index <= 0) {
                index = 0
            }
            clearTimeout(regionTimeOut)
            const regionTimeOut = setTimeout(() => {
                if (mapIndex != index) {
                    mapIndex = index;
                    _map.current.animateToRegion({
                        latitude: data[index].latitude,
                        longitude: data[index].longitude,
                        longitudeDelta: 0.0486419,
                        latitudeDelta: 0.04014281
                    }, 2000)
                }
            }, 50);

        })
        return () => {
            // scrollX.removeListener()
        }
    }, [])


    const goToPet = (item) => {
        setTimeout(() => {
            _map.current.animateToRegion({
                latitude: item.latitude,
                longitude: item.longitude,
                longitudeDelta: 0.001,
                latitudeDelta: 0.001
            }, 250)
        }, 1000);
    }

    const onMarkerPress = (e) => {
        const index = e._targetInst.return.key

        let x = index * wp(85)
        setTimeout(() => {
            _scrollView.current.scrollTo({ x: x, y: 0, animated: true })
        }, 500);
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.container}
                ref={_map}
                loadingEnabled={false}
                customMapStyle={isDarkTheme ? mapDarkStyle : mapStandardStyle}
                region={{
                    //latitude: location.coords.latitude,
                    //longitude: location.coords.longitude,
                    latitude: data[0].latitude,
                    longitude: data[0].longitude,
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001
                }}
            >
                <FocusAwareStatusBar translucent={true} barStyle={isDarkTheme ? "light-content" : "dark-content"} backgroundColor="transparent" />
                {data.map((pet, index) => {

                    const inputRange = [
                        (index - 1) * wp(80),
                        (index) * wp(80),
                        (index + 1) * wp(80)
                    ]
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [1, 1.5, 1],
                        extrapolate: 'clamp'
                    })

                    return (
                        <Marker
                            key={index}
                            onPress={(e) => onMarkerPress(e)}
                            title={pet.petName}
                            description={
                                `Age: ${pet.age}, Sexe: ${pet.sexe}  \n Desc`
                            }
                            coordinate={{
                                latitude: pet.latitude,
                                longitude: pet.longitude,
                            }}
                        >
                            <Animated.View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Animated.Image
                                    source={require('../../assets/Images/map_marker.png')}
                                    style={{ width: 35, height: 35, transform: [{ scale }], alignSelf: 'center' }}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    )
                })}
            </MapView>
            <View style={{ ...styles.searchBox, top: Platform.OS === 'ios' ? 80 : 100, position: 'absolute', elevation: 15, backgroundColor: isDarkTheme ? 'grey' : 'white' }}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor={isDarkTheme ? "#333" : "#000"}
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0, backgroundColor: isDarkTheme ? 'grey' : 'white' }}
                    onFocus={() => {
                        openModal()
                        setTimeout(() => {
                            ref2.current.focus()
                        }, 250);
                    }}
                />
                <Ionicons name="ios-search" size={24} color={isDarkTheme ? 'white' : 'black'} />
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {types.map((type, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{ ...styles.chipsItem, backgroundColor: isDarkTheme ? 'grey' : 'white' }}
                            onPress={() => {
                                setTimeout(() => {

                                }, 250);
                            }}
                        >
                            {index === (types.length - 1) ?
                                <AntDesign name="plus" size={24} color={isDarkTheme ? "white" : "black"} style={styles.chipsIcon} />
                                :
                                <MaterialIcons name="pets" size={24} color={isDarkTheme ? "white" : "black"} style={styles.chipsIcon} />
                            }
                            <Text>{index === (data.length - 1) ? 'Autres' : type.type}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <Animated.ScrollView
                decelerationRate={0.85}
                ref={_scrollView}
                style={styles.scrollView}
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={wp(80) + wp(5)}
                snapToAlignment={'center'}
                contentContainerStyle={{ paddingHorizontal: wp(7.5) }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
            >
                {data.map((pet, index) => {

                    const inputRange = [
                        (index - 1) * (wp(85)),
                        (index) * (wp(85)),
                        (index + 1) * (wp(85))
                    ]

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.6, 1, 0.6],
                    })

                    const inputRangeOpacity = [
                        (index - 1) * wp(85),
                        (index) * wp(85),
                        (index + 1) * wp(85)
                    ]

                    const opacity = scrollX.interpolate({
                        inputRange: inputRangeOpacity,
                        outputRange: [0.3, 1, 0.3],
                    })

                    return (
                        <Animated.View style={{
                            ...styles.card,
                            backgroundColor: isDarkTheme ? '#333' : 'white', transform: [{ scale }], opacity, elevation: isDarkTheme ? 0 : 20,
                            borderWidth: isDarkTheme ? 0.5 : 0, borderColor: isDarkTheme ? 'white' : null
                        }}
                            key={index} >
                            <Image
                                source={{ uri: pet.image }}
                                style={{ ...styles.cardImage }}
                                resizeMode='cover'
                            />
                            <Animated.Text style={{ ...styles.cardtitle, color: colors.text, }}>{`${pet.petName} , ${pet.age}`} </Animated.Text>
                            <Animated.Text style={{ ...styles.cardDescription, color: colors.text }}>{pet.description}</Animated.Text>
                        </Animated.View>
                    )
                })}
            </Animated.ScrollView>
        </View >
    );
}

// const styles = StyleSheet.create({

// })

const mapStateToProps = (state) => ({
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(index)

