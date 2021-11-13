import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(2),
    },
    titleOne: {
        fontWeight: 'bold',
        fontSize: hp(5),
        alignSelf: 'flex-start',
        marginStart: wp(5),
    },
    subTitleOne: {
        fontSize: wp(4),
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginStart: wp(5)
    },
    cardsContainer: {
        flexDirection: 'row'
    }
})

export default styles
