import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: wp(100),
        height: hp(9),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10
    },
    right: {
        position: 'absolute',
        right: wp(5),
    },
    left: {
        position: 'absolute',
        left: wp(5),
    },
    headerTitle: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 2
    }
})

export default styles
