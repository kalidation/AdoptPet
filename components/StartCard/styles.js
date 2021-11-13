import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    cardStart: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // height: hp('50%'),
        // width: wp('75%'),
        height: '50%',
        width: '50%',
        backgroundColor: 'white',
        elevation: 50,
        alignSelf: 'center'
    },
    cardTitle: {
        overflow: 'visible',
        fontSize: hp('3%'),
        fontWeight: 'bold',
        position: 'absolute',
        bottom: wp(10),
        elevation: 50,
    },
    cardText: {
        fontSize: 13,
        textAlign: 'center',
        position: 'absolute',
        top: wp(5),
        elevation: 50,
    }
})

export default styles
