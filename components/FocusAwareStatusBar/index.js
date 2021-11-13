import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const index = (props) => {
    const isFocused = useIsFocused();
    return (
        isFocused ? <StatusBar translucent={props.translucent ? true : false}  {...props} /> : null
    )
}

export default index
