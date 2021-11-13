import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: '10%'
    },
    textInput: {
        width: '95%',
        marginStart: '2%',
        marginTop: '5%',
        alignSelf: 'center',
    },
    button: {
        width: wp(40),
        height: hp(4),
        alignSelf: 'center',
        backgroundColor: '#0b3a45',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: '5%',
    }
})

export default styles
