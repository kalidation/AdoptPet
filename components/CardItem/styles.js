import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    cardBotContainer: {
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: 'white',
        height: hp(15),
        width: wp(80),
        marginTop: 10,
        elevation: 10,
        marginBottom: 10
    },
    cardViewDetails: {
        margin: '2%',
        width: '58%',
        height: '93%',
        padding: '1%',
        paddingStart: '2%',
        elevation: 50,
    },
    cardBotContactContainer: {
        //position: 'absolute',
        //top: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'space-between',
        marginTop: '10%',
        marginStart: '-2%'
    },
    cardName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: wp('5%'),
        alignSelf: 'flex-start',
    },
    cardAge: {
        fontSize: wp('2.7%'),
        color: '#555',
        alignSelf: 'flex-start',
    },
    cardImageBot: {
        width: '38%',
        height: '100%',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        resizeMode: 'cover',
        borderRadius: 15,
    }
})

export default styles
