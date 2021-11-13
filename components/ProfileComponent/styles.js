import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { drawerWp, ratio } from '../../shared/ratio'

const styles = StyleSheet.create({
    userInfo: {
        padding: 4,
        width: '100%',
        height: hp(15),
        borderBottomColor: '#999',
        borderBottomWidth: 0.25,
    },
    importantInfo: {
        padding: 4,
        flex: 0.6,
        flexDirection: 'row',
    },
    photoProfil: {
        marginEnd: 4,
        flex: 1,
        height: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        paddingStart: 5,
        marginStart: 4,
        flex: 3,
        height: '100%',
    },
    textUserName: {
        flex: 0.5,
        fontSize: hp(1.6)
    },
    petsDetails: {
        marginTop: 4,
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    petsOwned: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    petsSignaled: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetails: {
        fontSize: hp(1.6)
    }

})

export default styles
