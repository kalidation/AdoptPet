import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, RefreshControl, Animated } from 'react-native'
import styles from '../HomeScreen/styles'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { ButtonGroup } from 'react-native-elements'
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { getPets, reset } from '../../redux/PetsReducer/Pets.Actions'
import CardItem from '../../components/CardItem'
import { connect } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { data } from './mapData';

const index = (props) => {

    const component1 = () => (
        <LinearGradient
            style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', borderRadius: isDarkTheme ? 0 : 15 }}
            colors={selectedIndex === 0 ? ["#0F2027", "#203A43", "#2C5364"] : ['rgba(210,210,210,0.1)', 'rgba(210,210,210,0.1)', 'rgba(210,210,210,0.1)']}
        >
            <Text style={{ marginEnd: 10, color: selectedIndex === 0 ? 'white' : 'black' }}>Cats</Text>
            <MaterialCommunityIcons name="dog-side" size={20} color={selectedIndex === 0 ? 'white' : 'black'} />
        </LinearGradient>
    )
    const component2 = () => (
        <LinearGradient
            style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center' }}
            colors={selectedIndex === 1 ? ["#2C5364", "#203A43", "#0F2027"] : ['rgba(210,210,210,0.1)', 'rgba(210,210,210,0.1)', 'rgba(210,210,210,0.1)']}
        >
            <Text style={{ marginEnd: 10, color: selectedIndex === 1 ? 'white' : 'black' }} >Dogs</Text>
            <FontAwesome5 name="cat" size={20} color={selectedIndex === 1 ? 'white' : 'black'} />
        </LinearGradient>
    )
    const component3 = () => (
        <LinearGradient
            style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', borderRadius: isDarkTheme ? 0 : 15 }}
            colors={selectedIndex === 2 ? ["#093028", "#2c3e50"] : ['rgba(210,210,210,0.1)', 'rgba(210,210,210,0.1)', 'rgba(210,210,210,0.1)']}
        >
            <Text style={{ marginEnd: 10, color: selectedIndex === 2 ? 'white' : 'black' }} >Others</Text>
            <Entypo name="list" size={20} color={selectedIndex === 2 ? 'white' : 'black'} />
        </LinearGradient>
    )

    const scrollY = React.useRef(new Animated.Value(0)).current;

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '5%',
                    marginTop: hp(0.5)
                }}
            />
        )
    }

    const onRefresh = () => {
        reset()
        setRefreshing(true)
        setTimeout(() => {
            switch (selectedIndex) {
                case 0:
                    reset()
                    getPets(0)
                    return;
                case 1:
                    reset()
                    getPets(1)
                    return;
                case 2:
                    reset()
                    getPets(3)
                    return;
                default:
                    return;
            }
        }, 1000);
        setRefreshing(false)
    }

    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    const { navigation, getPets, isFetching, hasError, errorMessage, fullPets, reset, isDarkTheme } = props
    const [selectedIndex, setselectedIndex] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const { colors } = useTheme()

    useEffect(() => {
        var unsubscribe = getPets(0)
        return () => {
            unsubscribe()
        }
    }, [])

    const getPetsFromServer = (selectedIndex) => {
        setselectedIndex(selectedIndex)
        switch (selectedIndex) {
            case 0:
                reset()
                getPets(0)
                return;
            case 1:
                reset()
                getPets(1)
                return;
            case 2:
                reset()
                getPets(2)
                return;
            default:
                return;
        }
    }

    // const getPetsFromServer = () => {
    //     getPets()
    // }

    const savePet = (pet) => {
        alert(JSON.stringify(pet))
    }

    return (
        <View>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#082732" />
            <Text style={{ alignSelf: 'center', marginTop: hp(2.5), fontWeight: 'bold', fontSize: hp(3), color: colors.text }}> Pets </Text>
            <ButtonGroup
                containerStyle={{ width: '75%', alignSelf: 'center', marginTop: hp(2.5), borderRadius: 15, borderColor: 'rgba(210,210,210,0.3)', backgroundColor: isDarkTheme ? '#555' : 'rgba(210,210,210,0.1)' }}
                buttonContainerStyle={{ borderColor: 'white', borderRadius: isDarkTheme ? 0 : 15 }}
                buttonStyle={{ borderRadius: 0, borderColor: isDarkTheme ? '#333' : 'rgba(210,210,210,0.3)' }}
                buttons={buttons}
                selectedButtonStyle={{ backgroundColor: '#0D2F41' }}
                selectedIndex={selectedIndex}
                onPress={(selectedIndex) => getPetsFromServer(selectedIndex)}
                underlayColor={'white'}
            />
            <Animated.FlatList
                style={{ alignSelf: 'center', marginTop: '5%' }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <CardItem index={index} item={item} isDarkTheme={isDarkTheme} savePet={savePet} scrollY={scrollY} />}
                ItemSeparatorComponent={renderSeparator}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

        </View>
    )
}

const mapStateToProps = (state) => ({
    isFetching: state.petsReducer.isFetching,
    hasError: state.petsReducer.hasError,
    errorMessage: state.petsReducer.errorMessage,
    fullPets: state.petsReducer.fullPets,
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {
    getPets,
    reset,
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
