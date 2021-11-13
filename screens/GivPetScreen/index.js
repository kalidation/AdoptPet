import React, { useContext, useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import styles from './styles'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { ToastContext } from '../../routes/ShowToastProvider'
import { firebase } from '../../firebase/Firebase'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import { Input } from 'react-native-elements'
import { values } from './petsValues'
import { signalValidationSchema } from './validationSchema'
import { ratio } from '../../shared/ratio'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { typesItems } from './typesItems'
import { sexeItems } from './sexeItems'
import * as Location from 'expo-location';
import {
    Dropdown,
    GroupDropdown,
    MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';


const index = ({ user, navigation, isDarkTheme }) => {

    const [uri, setUri] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState('')
    const [sexe, setSexe] = useState('')
    const [isKeyOpen, setIsKeyOpen] = useState(false)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [spinner, setSpinner] = useState(true)

    const [charging, setCharging] = useState({
        charged: false,
        taux: 0
    })

    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const ThirdInput = useRef(null);
    const FourthInput = useRef(null);
    const fifthInput = useRef(null)

    const { showToast } = useContext(ToastContext)

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        getLocation()
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        }
    }, [])

    const _keyboardDidShow = () => {
        setIsKeyOpen(true)
    };

    const _keyboardDidHide = () => {
        setIsKeyOpen(false)
    };

    const handleType = (type) => {
        setType(type)
    };

    const handleSexe = (sexe) => {
        setSexe(sexe)
    };

    const getLocation = async () => {
        setSpinner(true)
        const { status: existingStatus } = await Location.getPermissionsAsync();
        if (existingStatus !== 'granted') {
            alert('Getting new permission')
            const { status: newStatus } = await Location.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('No location permissions');
                return;
            }
        }
        return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
            .then((location) => {
                setLocation(location.coords)
                setSpinner(false)
            }).catch((e) => {
                console.log('====================================');
                console.log(e);
                console.log('====================================');
            })
    }

    let choosePicture = async () => {
        let permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted === false) {
            showToast('warning', 'Permission must be granted')
            return;
        }
        let picker = await ImagePicker.launchImageLibraryAsync()
        if (picker.cancelled === true) {
            showToast('info', 'Cancled')
            return;
        }
        setUri({ localUri: picker.uri })
        showToast('success', 'Image choosen')
    }

    const addPet = async (values, uri, type, sexe) => {
        if (uri === null) {
            showToast('warning', 'please choose a picture')
            return;
        }
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.onerror = (e) => {
                console.log(e);
                reject(new TypeError('Network request failed'))
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const storageRef = firebase.storage().ref().child('Image/Pets')
        let fileName = `${values.petName}_${user.uid}`
        var uploadTask = storageRef.child(fileName).put(blob);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setCharging({ charged: true, taux: progress })
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('User doesn"t have permission to access the object');
                        break;
                    case 'storage/canceled':
                        console.log('User canceled the upload');
                        break;
                    case 'storage/unknown':
                        console.log('Unknown error occurred, inspect error.serverResponse');
                        break;
                }
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURL) => {
                        setImage(downloadURL)
                        uploadPetToServer(values, downloadURL, type, sexe)
                    })
            }
        )

    }

    const uploadPetToServer = async (values, downloadURL, type, sexe) => {
        var id;
        //var date = moment().format('YYYY-MMM-DD-HH-mm')
        await firebase.firestore().collection("Pets").get().then((querySnapshot) => {
            if (querySnapshot.docs.length === 0) {
                id = 0;
            } else {
                id = querySnapshot.docs[querySnapshot.docs.length - 1].data().id + 1
            }
        });
        if (type === '' || sexe === '') {
            return alert('Type and Sexe are requiried')
        }
        var pet = {
            petName: values.petName,
            age: values.age,
            phone: values.phone,
            description: values.description,
            sexe: sexe,
            type: type,
            image: downloadURL,
            owner: user.uid
        }
        await firebase.firestore().collection("Pets")
            .doc(id.toString())
            .set(pet)
            .then(() => {
                setCharging({ charged: false, taux: 0 })
                showToast('success', 'Sent')
            })
            .catch((error) => {
                setCharging({ charged: false, taux: 0 })
                showToast('warning', error.message)
            })
    }


    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
            <ScrollView style={styles.container}>
                <FocusAwareStatusBar barStyle="light-content" backgroundColor="#082732" />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ height: heightPercentageToDP(100) }}>
                    <Spinner
                        visible={spinner}
                        textContent={'Getting Location ...'}
                        textStyle={{ color: isDarkTheme ? '#fff' : '#000' }}
                        cancelable={false}
                    />
                    <Text style={{ ...styles.title, color: isDarkTheme ? 'white' : '#082732' }}> Give Pet </Text>
                    <Formik
                        initialValues={values}
                        validationSchema={signalValidationSchema}
                        onSubmit={async (values) => addPet(values, uri.localUri, type, sexe)}
                    >{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>
                        <View>
                            <Input
                                onSubmitEditing={() => {
                                    secondInput.current.focus()
                                }}
                                onChangeText={
                                    handleChange('petName')
                                }
                                onBlur={() =>
                                    setFieldTouched('petName')
                                }
                                errorMessage={
                                    touched.petName && errors.petName ? `${errors.petName}` : null
                                }
                                errorStyle={{
                                    color: "red",
                                    fontSize: ratio * 22,
                                    letterSpacing: 1
                                }}
                                labelStyle={{ color: isDarkTheme ? 'white' : '#082732', fontSize: heightPercentageToDP(2.5) }}
                                containerStyle={styles.inputs}
                                ref={firstInput}
                                returnKeyType="next"
                                value={values.petName}
                                keyboardType='email-address'
                                placeholder={'Pet Name'}
                                label={'Name'}
                            />
                            <Input
                                containerStyle={styles.inputs}
                                labelStyle={{ color: isDarkTheme ? 'white' : '#082732', fontSize: heightPercentageToDP(2.5) }}
                                onSubmitEditing={() => {
                                    ThirdInput.current.focus()
                                }}
                                onChangeText={
                                    handleChange('age')
                                }
                                onBlur={() =>
                                    setFieldTouched('age')
                                }
                                errorMessage={
                                    touched.age && errors.age ? `${errors.age}` : null
                                }
                                errorStyle={{
                                    color: "red",
                                    fontSize: ratio * 22,
                                    letterSpacing: 1
                                }}
                                ref={secondInput}
                                returnKeyType="next"
                                value={values.age}
                                keyboardType='numeric'
                                placeholder={'Pet Age'}
                                label={'Age'}
                            />
                            <Input
                                containerStyle={styles.inputs}
                                labelStyle={{ color: isDarkTheme ? 'white' : '#082732', fontSize: heightPercentageToDP(2.5) }}
                                onSubmitEditing={() => {
                                    FourthInput.current.focus()
                                }}
                                onChangeText={
                                    handleChange('phone')
                                }
                                onBlur={() =>
                                    setFieldTouched('phone')
                                }
                                errorMessage={
                                    touched.phone && errors.phone ? `${errors.phone}` : null
                                }
                                errorStyle={{
                                    color: "red",
                                    fontSize: ratio * 22,
                                    letterSpacing: 1
                                }}
                                returnKeyType="next"
                                ref={ThirdInput}
                                value={values.phone}
                                keyboardType='phone-pad'
                                placeholder={'Your Phone'}
                                label={'Phone'}
                            />
                            <Input
                                onSubmitEditing={() => {
                                    fifthInput.current.focus()
                                }}
                                onChangeText={
                                    handleChange('description')
                                }
                                onBlur={() =>
                                    setFieldTouched('description')
                                }
                                errorMessage={
                                    touched.description && errors.description ? `${errors.description}` : null
                                }
                                errorStyle={{
                                    color: "red",
                                    fontSize: ratio * 22,
                                    letterSpacing: 1
                                }}
                                containerStyle={{ ...styles.inputs, marginBottom: 1 }}
                                multiline={true}
                                numberOfLines={2}
                                maxLength={250}
                                labelStyle={{ color: isDarkTheme ? 'white' : '#082732', fontSize: heightPercentageToDP(2.5) }}
                                ref={FourthInput}
                                returnKeyType='go'
                                inputContainerStyle={{ alignContent: 'flex-start', }}
                                value={values.description}
                                keyboardType='default'
                                label={'Description'}
                                placeholder={'Describe Your Pet ...'}
                            />
                            <View style={{
                                borderTopColor: 'grey',
                                borderTopWidth: 0.5,
                                width: '80%',
                                alignSelf: 'center',
                                marginTop: 20
                            }}></View>
                            <View style={{ ...styles.pickers, marginTop: 20 }}>
                                <Dropdown
                                    textInputPlaceholder={'Select Sexe ...'}
                                    textInputPlaceholderColor={isDarkTheme ? '#999' : '#999'}
                                    floating={true}
                                    required={true}
                                    label={""}
                                    removeLabel={true}
                                    data={sexeItems}
                                    enableAvatar={true}
                                    value={sexe}
                                    avatarSize={40}
                                    onChange={handleSexe}
                                    underlineColor={'#999'}
                                />
                            </View>
                            <View style={styles.pickers}>
                                <Dropdown
                                    textInputPlaceholder={'Select Type ...'}
                                    textInputPlaceholderColor={isDarkTheme ? '#999' : '#999'}
                                    floating={true}
                                    required={true}
                                    removeLabel={true}
                                    label={""}
                                    data={typesItems}
                                    enableAvatar={true}
                                    value={type}
                                    avatarSize={40}
                                    onChange={handleType}
                                    underlineColor={'#999'}
                                />
                            </View>
                            <View style={{ ...styles.footer }}>
                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={styles.bottomButton}>
                                    <FontAwesome5 name="gripfire" size={20} color="white" />
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>ADD</Text>
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons
                                        name="ios-images"
                                        size={ratio * 70}
                                        color="#082732"
                                        onPress={() => {
                                            choosePicture()
                                        }}
                                    />
                                    {/* <Text style={{ fontSize: heightPercentageToDP(1.5) }}>Choose Picture</Text> */}
                                </View>
                            </View>
                        </View>
                        }
                    </Formik>
                </ScrollView>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(index)
