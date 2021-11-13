import React, {useContext, useState, useEffect, useRef} from 'react'
import {View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard} from 'react-native'
import styles from './styles'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import {ToastContext} from '../../routes/ShowToastProvider'
import {firebase} from '../../firebase/Firebase'
import * as ImagePicker from 'expo-image-picker'
import {Formik} from 'formik'
import {Input} from 'react-native-elements'
import {values} from './petsValues'
import {signalValidationSchema} from './validationSchema'
import {ratio} from '../../shared/ratio'
import {Ionicons, FontAwesome5} from '@expo/vector-icons'
import {typesItems} from './typesItems'
import {sexeItems} from './sexeItems'
import moment from 'moment'
import {
    Dropdown,
    GroupDropdown,
    MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import {heightPercentageToDP} from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import {TouchableWithoutFeedback} from 'react-native'
import {useTheme} from "@react-navigation/native";


const index = ({user, navigation, isDarkTheme}) => {

    const [uri, setUri] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState('')
    const [sexe, setSexe] = useState('')
    const [isKeyOpen, setIsKeyOpen] = useState(false)

    const [charging, setCharging] = useState({
        charged: false,
        taux: 0
    })

    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const ThirdInput = useRef(null);
    const FourthInput = useRef(null);
    const fifthInput = useRef(null)

    const {showToast} = useContext(ToastContext)
    const {colors} = useTheme()

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
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
        setUri({localUri: picker.uri})
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
                setCharging({charged: true, taux: progress})
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
        await firebase.firestore().collection("Signaled").get().then((querySnapshot) => {
            if (querySnapshot.docs.length === 0) {
                id = 0;
            } else {
                id = querySnapshot.docs[querySnapshot.docs.length - 1].data().id + 1
            }
        });
        if (type === '') {
            return alert('Type are requiried')
        }
        var pet = {
            phone: values.phone,
            description: values.description,
            sexe: sexe,
            type: type,
            image: downloadURL,
            owner: user.uid
        }
        await firebase.firestore().collection("Signaled")
            .doc(id.toString())
            .set(pet)
            .then(() => {
                setCharging({charged: false, taux: 0})
                showToast('success', 'Sent')
            })
            .catch((error) => {
                setCharging({charged: false, taux: 0})
                showToast('warning', error.message)
            })
    }


    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <FocusAwareStatusBar barStyle="light-content" backgroundColor="#082732"/>
                <ScrollView style={{flex: 1}} contentContainerStyle={{height: heightPercentageToDP(80)}}>
                    <Text style={{...styles.title, color: isDarkTheme ? colors.text : '#082732' }}> Signal Pet </Text>
                    <Formik
                        initialValues={values}
                        validationSchema={signalValidationSchema}
                        onSubmit={async (values) => addPet(values, uri.localUri, type, sexe)}
                    >{({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit}) =>
                        <View>
                            <Input
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
                                placeholder={'Discribe Your Pet'}
                                containerStyle={{...styles.inputs, marginBottom: 1}}
                                multiline={true}
                                numberOfLines={2}
                                maxLength={250}
                                labelStyle={{color: isDarkTheme ? 'white' : '#082732'}}
                                ref={FourthInput}
                                returnKeyType='go'
                                inputContainerStyle={{alignContent: 'flex-start',}}
                                value={values.description}
                                keyboardType='default'
                                label={'Description'}
                            />
                            <Input
                                containerStyle={styles.inputs}
                                labelStyle={{color: '#082732'}}
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
                                labelStyle={{color: isDarkTheme ? 'white' : '#082732'}}
                                returnKeyType="next"
                                ref={ThirdInput}
                                value={values.phone}
                                keyboardType='phone-pad'
                                placeholder={'Your Phone'}
                                label={'Phone'}
                            />
                            <View style={{
                                borderTopColor: 'grey',
                                borderTopWidth: 0.5,
                                width: '80%',
                                alignSelf: 'center',
                                marginTop: 20
                            }}></View>
                            <View style={{...styles.pickers, marginTop: 20}}>
                                <Dropdown
                                    textInputPlaceholder={'Select Sexe ...'}
                                    textInputPlaceholderColor={isDarkTheme ? '#999' : '#999'}
                                    floating={false}
                                    required={true}
                                    label={""}
                                    removeLabel={true}
                                    data={sexeItems}
                                    enableAvatar={true}
                                    value={sexe}
                                    avatarSize={40}
                                    onChange={handleSexe}
                                    underlineColor={isDarkTheme ? '#999' :'#999'}
                                />
                            </View>
                            <View style={styles.pickers}>
                                <Dropdown
                                    textInputPlaceholder={'Select Type ...'}
                                    textInputPlaceholderColor={isDarkTheme ? '#999' : '#999'}
                                    floating={false}
                                    required={true}
                                    label={""}
                                    removeLabel={true}
                                    data={typesItems}
                                    enableAvatar={true}
                                    value={type}
                                    avatarSize={40}
                                    onChange={handleType}
                                    underlineColor={isDarkTheme ? '#999' :'#999'}
                                />
                            </View>
                            <View style={{...styles.footer}}>
                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={styles.bottomButton}>
                                    <FontAwesome5 name="gripfire" size={20} color="white"/>
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>ADD</Text>
                                </TouchableOpacity>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isDarkTheme : state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(index)
