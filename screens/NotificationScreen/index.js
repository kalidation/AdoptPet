import React from 'react'
import { View, Text } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'

const index = () => {
    return (
        <View>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1C3B53" />
            <Text> Notifications </Text>
        </View>
    )
}

export default index
