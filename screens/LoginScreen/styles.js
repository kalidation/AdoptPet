import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        height: hp(30),
        //flex: 0.3,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: 'flex-end',
        paddingBottom: 50,
        paddingStart: 20
    },
    bottomContainer: {
        height: hp(80),
        //flex: 0.7,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        backgroundColor: '#1b4f49',
        paddingHorizontal: 10
    },
    buttonSplash: {
        marginTop: 40,
        backgroundColor: "#7ad6aa",
        borderRadius: 15,
        width: '80%',
        height: '6%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 15,
        marginHorizontal: 10,
    },
    buttonSignUp: {
        borderRadius: 10,
        width: '80%',
        height: '6%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 15,
        marginHorizontal: 10,
        backgroundColor: '#c3e3d4',
        marginTop: 20,
    }
})

export default styles
