import { useTheme } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Input } from 'react-native-elements'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import styles from './styles'
import { profilValidationSchema } from './validationSchema'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import { firebase } from '../../firebase/Firebase'
import { Platform } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Image } from 'react-native'


const index = () => {

    const { colors } = useTheme()
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [img, setImg] = useState('')

    const submitChanges = async (newEmail, newPhone, newName) => {
        if ((newEmail == '') && (newPhone != '')) {
            alert(newPhone)
        }
        if ((newPhone == '') && (newEmail != '')) {
            alert(newEmail)
        }
        if ((newPhone != '') && (newEmail != '')) {
            alert(`${newEmail}, ${newPhone} `)
        }
        if (newName != '') {
            alert(newName)
            var splited = newName.toString().split(" ");
            let firstName = splited[0]
            let LastName = splited[1]
            setImg(`https://ui-avatars.com/api/?name=${firstName}+${LastName}&background=random&color=000&rounded=true&bold=true`)
            await user.updateProfile({
                displayName: newName,
                photoURL: `https://ui-avatars.com/api/?name=${firstName}+${LastName}&background=random&color=000&rounded=true&bold=true`
            })
        }
    }

    useEffect(() => {
        const user = firebase.auth().currentUser
        setUser(user)
        return () => {

        }
    }, [])


    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10 }} >
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#0b3a45" />
            <Text style={{ alignSelf: 'center', color: colors.text, fontSize: 30 }} >Your Profil</Text>
            <Input
                containerStyle={styles.textInput}
                value={name}
                labelStyle={{ color: colors.text }}
                label={'Ful Name'}
                inputStyle={{ color: 'white' }}
                placeholder={'Your Full Name ...'}
                onChangeText={(name) => setName(name)}
                rightIcon={<Ionicons name="person" size={24} color={colors.text} />}
            />
            <Input
                containerStyle={styles.textInput}
                value={email}
                labelStyle={{ color: colors.text }}
                label={'Update Your E-mail'}
                inputStyle={{ color: 'white' }}
                placeholder={'New E-mail ...'}
                onChangeText={(email) => setEmail(email)}
                rightIcon={<MaterialIcons name="email" size={24} color={colors.text} />}
            />
            <Input
                containerStyle={styles.textInput}
                value={phone}
                labelStyle={{ color: colors.text }}
                label={'Update Your Phone'}
                inputStyle={{ color: 'white' }}
                placeholder={'New Phone ...'}
                onChangeText={(phone) => setPhone(phone)}
                rightIcon={<MaterialIcons name="phone" size={24} color={colors.text} />}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => submitChanges(email, phone, name)}
            >
                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15 }}>
                    Submit changes
                                </Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}


export default index
{/* <Formik
                            initialValues={values}
                            validationSchema={profilValidationSchema}
                        >
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>
                                <View style={{ height: '50%' }}>
                                    <Input
                                        containerStyle={styles.textInput}
                                        value={values.email}
                                        labelStyle={{ color: colors.text }}
                                        label={'Update Your E-mail'}
                                        placeholder={'New E-mail ...'}
                                        onChangeText={handleChange('email')}
                                        rightIcon={<MaterialIcons name="email" size={24} color={colors.text} />}
                                    />
                                    <Input
                                        labelStyle={{ color: colors.text }}
                                        containerStyle={styles.textInput}
                                        label={'Update Your Phone Number'}
                                        placeholder={'New Phone Number ...'}
                                        value={values.phone}
                                        onChangeText={handleChange('phone')}
                                        rightIcon={<MaterialIcons name="phone" size={24} color={colors.text} />}
                                    />
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => alert(JSON.stringify(values))}
                                    >
                                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15 }}>
                                            Change Informations
                                </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </Formik> */}