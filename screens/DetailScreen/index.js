import React from 'react'
import { View, Text } from 'react-native'
import styles from '../HomeScreen/styles'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { Image } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'



const index = ({ navigation, route }) => {
    // const { item, index } = route.params
    // return (
    //     <View>
    //         <FocusAwareStatusBar barStyle="light-content" backgroundColor="#0D2F41" />
    //         <SharedElement style={{ alignSelf: 'flex-end' }} id={`item.${index}.petName`}>
    //             <Text> {item.petName} </Text>
    //         </SharedElement>
    //         <SharedElement style={{ alignSelf: 'flex-end' }} id={`item.${index}.age`}>
    //             <Text> {item.age} </Text>
    //         </SharedElement>
    //         <SharedElement style={{ alignSelf: 'flex-end' }} id={`item.${index}.image`}>
    //             <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: item.image }} />
    //         </SharedElement>
    //     </View>
    // )

    const { item } = route.params;
    return (
        <SharedElement style={{ width: '100%', height: '100%' }} id={`item.${0}.photo`}>
            <Image style={{ width: '50%', height: '50%' }} source={{ uri: item.image }} />
        </SharedElement>
    );
}


index.sharedElements = (route, ortherRoute, showing) => {
    const { item, index } = route.params
    return [
        {
            id: `item.${0}.photo`,
            animation: 'fade',
            //resize: 'clip',
            //align: 'top'
        }
        // `item.${index}.image`,
        // `item.${index}.petName`,
        // `item.${index}.age`,
    ]
}


export default index
