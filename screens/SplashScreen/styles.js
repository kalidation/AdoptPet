import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    bottomContainer: {
        padding: 8,
        paddingTop: 50,
        paddingStart: 50,
        paddingEnd: 35,
        backgroundColor: "#1b4f49",
        flex: 0.4,
        width: '100%',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
    },
    topContainer: {
        flex: 0.6,
        width: '100%',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSplash: {
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 15,
        width: '30%',
        height: '12.5%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        elevation: 20
    }
})


export default styles
