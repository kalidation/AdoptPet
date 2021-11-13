import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    cardTop: {
        borderRadius: 20,
        backgroundColor: 'white',
        width: wp('45%'),
        height: hp('39%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        margin: hp('1%'),
        paddingStart: wp('1%'),
        paddingLeft: wp('1%')
    },
    cardTopImage: {
        width: wp('30%'),
        height: hp('35%'),
        marginTop: -55,
    },
    cardName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: wp('5%'),
        alignSelf: 'flex-start',
        marginStart: wp('5%')
    },
    cardAge: {
        fontSize: wp('2%'),
        color: '#666',
        alignSelf: 'flex-start',
        marginStart: wp('6%')
    },
    contactContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginStart: wp('5%'),
        marginTop: hp('1%'),
    }

})

export default styles
