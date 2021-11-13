import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    cardBotContainer: {
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: 'white',
        width: wp(85),
        height: hp(15),
        marginTop: 30,
        elevation: 20,
    },
    cardViewDetails: {
        marginStart: wp('5%'),
        width: wp(50),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardBotContactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginTop: 10,
        marginStart: -10,
        position: 'absolute',
        top: hp(5)
    },
    cardName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: wp('5%'),
        alignSelf: 'flex-start',
    },
    cardAge: {
        fontSize: wp('2.5%'),
        color: '#666',
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: hp(4),
        color: 'white',
        fontWeight: 'bold',
        marginStart: hp(3),
        letterSpacing: 2
    },
    cardImageBot: {
        width: hp(15),
        height: hp(15),
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 15,
    }
})

export default styles
