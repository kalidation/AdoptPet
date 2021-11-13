import React, { Component } from 'react'
import { Animated, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../SavedPetScreen/styles'
import CardItem from '../../components/CardItem'
import { Image } from 'react-native'
import { ImageBackground } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import DetailScreen from '../../screens/DetailScreen';
import { data } from './mapData'
import { SharedElement } from 'react-navigation-shared-element'


// const data = [
//     {
//         age: "12",
//         description: "Fjj",
//         image: "https://firebasestorage.googleapis.com/v0/b/fooder-59962.appspot.com/o/Image%2FPets%2Fkhaled_S6OWjwvZcSYCAIcQJMrBnHQNuXW2?alt=media&token=dea14e98-004d-47e8-9e6a-dec074487715",
//         owner: "S6OWjwvZcSYCAIcQJMrBnHQNuXW2",
//         petName: "khaled",
//         phone: "76",
//         sexe: "Female",
//         type: "Dogs",
//     },
//     {
//         age: "12",
//         description: "Fjj",
//         image: "https://firebasestorage.googleapis.com/v0/b/fooder-59962.appspot.com/o/Image%2FPets%2Fkhaled_S6OWjwvZcSYCAIcQJMrBnHQNuXW2?alt=media&token=dea14e98-004d-47e8-9e6a-dec074487715",
//         owner: "S6OWjwvZcSYCAIcQJMrBnHQNuXW2",
//         petName: "khaled",
//         phone: "76",
//         sexe: "Female",
//         type: "Dogs",
//     },
//     {
//         age: "12",
//         description: "Fjj",
//         image: "https://firebasestorage.googleapis.com/v0/b/fooder-59962.appspot.com/o/Image%2FPets%2Fkhaled_S6OWjwvZcSYCAIcQJMrBnHQNuXW2?alt=media&token=dea14e98-004d-47e8-9e6a-dec074487715",
//         owner: "S6OWjwvZcSYCAIcQJMrBnHQNuXW2",
//         petName: "khaled",
//         phone: "76",
//         sexe: "Female",
//         type: "Dogs",
//     },
//     {
//         age: "12",
//         description: "Fjj",
//         image: "https://firebasestorage.googleapis.com/v0/b/fooder-59962.appspot.com/o/Image%2FPets%2Fkhaled_S6OWjwvZcSYCAIcQJMrBnHQNuXW2?alt=media&token=dea14e98-004d-47e8-9e6a-dec074487715",
//         owner: "S6OWjwvZcSYCAIcQJMrBnHQNuXW2",
//         petName: "khaled",
//         phone: "76",
//         sexe: "Female",
//         type: "Dogs",
//     },
//     {
//         age: "12",
//         description: "Fjj",
//         image: "https://firebasestorage.googleapis.com/v0/b/fooder-59962.appspot.com/o/Image%2FPets%2Fkhaled_S6OWjwvZcSYCAIcQJMrBnHQNuXW2?alt=media&token=dea14e98-004d-47e8-9e6a-dec074487715",
//         owner: "S6OWjwvZcSYCAIcQJMrBnHQNuXW2",
//         petName: "khaled",
//         phone: "76",
//         sexe: "Female",
//         type: "Dogs",
//     },
//     {
//         age: "12",
//         description: "Fjj",
//         image: "https://firebasestorage.googleapis.com/v0/b/fooder-59962.appspot.com/o/Image%2FPets%2Fkhaled_S6OWjwvZcSYCAIcQJMrBnHQNuXW2?alt=media&token=dea14e98-004d-47e8-9e6a-dec074487715",
//         owner: "S6OWjwvZcSYCAIcQJMrBnHQNuXW2",
//         petName: "khaled",
//         phone: "76",
//         sexe: "Female",
//         type: "Dogs",
//     },
//     {
//         age: "12",
//         description: "Fjj",
//         image: "https://firebasestorage.googleapis.com/v0/b/fooder-59962.appspot.com/o/Image%2FPets%2Fkhaled_S6OWjwvZcSYCAIcQJMrBnHQNuXW2?alt=media&token=dea14e98-004d-47e8-9e6a-dec074487715",
//         owner: "S6OWjwvZcSYCAIcQJMrBnHQNuXW2",
//         petName: "khaled",
//         phone: "76",
//         sexe: "Female",
//         type: "Dogs",
//     }
// ]


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

const index = (props) => {

    const scrollY = React.useRef(new Animated.Value(0)).current;

    const item = data[0]

    const { petSaved, isDarkTheme } = props
    return (
        <View style={{ flex: 1 }}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#659999" />
            {/* <ImageBackground
                source={require('../../assets/Images/pexels-dương-nhân-2817405.jpg')}
                style={StyleSheet.absoluteFillObject}
                blurRadius={5}
            /> */}
            <Animated.FlatList
                style={{ alignSelf: 'center', marginTop: '5%' }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <CardItem {...props} scrollY={scrollY} item={item} index={index} isDarkTheme={isDarkTheme} />}
                ItemSeparatorComponent={renderSeparator}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            />
        </View>
    )
    // return (
    //     <TouchableOpacity style={{ width: '50%', height: '50%' }} onPress={() => props.navigation.push('Detail', { item })}>
    //         <SharedElement style={{ width: '50%', height: '50%' }} id={`item.${0}.photo`}>
    //             <Image style={{ width: '100%', height: '100%' }} source={{ uri: data[0].image }} />
    //         </SharedElement>
    //     </TouchableOpacity>
    // );
}



const mapStateToProps = (state) => ({
    petSaved: state.savedPetReducer.petSaved,
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(index)
