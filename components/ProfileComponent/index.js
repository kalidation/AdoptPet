import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-paper'
import { ratio } from '../../shared/ratio'
import styles from './styles'
import { firebase } from '../../firebase/Firebase'



const index = (props) => {

    const { themeColors, user } = props

    //const [user, setUser] = useState(firebase.auth().currentUser)

    useEffect(() => {
        console.log(user);
    }, [])

    return (
        <View style={styles.userInfo}>
            {
                user === null
                    ?
                    <>
                        <View style={styles.importantInfo}>
                            {/* <Avatar.Image source={require('../../assets/favicon.png')} style={styles.photoProfil} size={ratio * 100} /> */}
                            <Avatar.Image source={{ uri: 'https://ui-avatars.com/api/?name=A+P&background=random' }} style={styles.photoProfil} size={ratio * 100} />
                            <View style={styles.userName}>
                                <Text style={{ ...styles.textUserName, color: themeColors }}>{' User '}</Text>
                                <Text style={{ ...styles.textUserName, color: themeColors }}>{' User Email'}</Text>
                            </View>

                        </View>
                        <View style={styles.petsDetails}>
                            <View style={styles.petsSignaled} >
                                <Text style={{ ...styles.textDetails, fontWeight: 'bold', color: themeColors }}> 10 </Text>
                                <Text style={{ ...styles.textDetails, color: themeColors }}> Owned </Text>
                            </View>
                            <View style={styles.petsOwned}>
                                <Text style={{ ...styles.textDetails, fontWeight: 'bold', color: themeColors }}> 5 </Text>
                                <Text style={{ ...styles.textDetails, color: themeColors }}> signaled </Text>
                            </View>
                        </View>
                    </>
                    :
                    <>
                        <View style={styles.importantInfo}>
                            {/* <Avatar.Image source={require('../../assets/favicon.png')} style={styles.photoProfil} size={ratio * 100} /> */}
                            <Avatar.Image source={{ uri: user.photoURL }} style={styles.photoProfil} size={ratio * 100} />
                            <View style={styles.userName}>
                                <Text style={{ ...styles.textUserName, color: themeColors }}>{user.displayName}</Text>
                                <Text style={{ ...styles.textUserName, color: themeColors }}>{user.email}</Text>
                            </View>

                        </View>
                        <View style={styles.petsDetails}>
                            <View style={styles.petsSignaled} >
                                <Text style={{ ...styles.textDetails, fontWeight: 'bold', color: themeColors }}> 10 </Text>
                                <Text style={{ ...styles.textDetails, color: themeColors }}> Owned </Text>
                            </View>
                            <View style={styles.petsOwned}>
                                <Text style={{ ...styles.textDetails, fontWeight: 'bold', color: themeColors }}> 5 </Text>
                                <Text style={{ ...styles.textDetails, color: themeColors }}> signaled </Text>
                            </View>
                        </View>
                    </>
            }


        </View >
    )
}

export default index
