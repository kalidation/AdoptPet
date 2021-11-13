import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        alignSelf: 'center',
        marginTop: hp(3),
        fontSize: hp(4.5),
        marginBottom: hp(3),
        color: '#082732',
        fontWeight: 'bold',
        letterSpacing: 3
    },
    inputs: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: hp(1.5),
    },
    pickers: {
        alignSelf: 'center',
        height: '11%',
        width: '90%',
        marginTop: 15,
    },
    bottomButton: {
        width: '35%',
        flexDirection: 'row',
        height: '95%',
        backgroundColor: '#082732',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    footer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        height: '6%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10
    }
})

export default styles
