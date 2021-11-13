import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    drawerContent: {
        backgroundColor: 'black',
        borderRightWidth: 1,
        borderRightColor: 'white'
    },
    drawerBottomSection: {
        borderTopColor: '#999',
        borderTopWidth: 0.25,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.25,
        borderRightWidth: 1,
        borderRightColor: 'white'
    },
    prefer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default styles
