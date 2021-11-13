import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { loginValidationSchema } from './validationSchema';
import { ratio } from '../../shared/ratio';
import styles from './styles'
import { connect } from 'react-redux';
import { register } from '../../redux/Auth/Auth.Actions';
import { StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const index = (props) => {

    const { register, isRegister, RegisterErrorMessage, errorRegister } = props

    const [securePassword, setSecurePassword] = useState(true)
    const [secondSecurePassword, setSecondSecurePassword] = useState(true)
    const [isKeyOpen, setIsKeyOpen] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const { colors } = useTheme()

    const fadeAnim = useRef(new Animated.Value(0)).current
    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const ThirdInput = useRef(null);

    const fade = {
        0: {
            opacity: 0,
        },
        0.5: {
            opacity: 0.5,
        },
        1: {
            opacity: 1,
        },
    };

    const values = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
        }).start()
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        }
    }, [fadeAnim])

    const _keyboardDidShow = () => {
        setIsKeyOpen(true)
    };

    const _keyboardDidHide = () => {
        setIsKeyOpen(false)
    };

    const submitRegister = async ({ email, password }) => {
        await register(email, password)
        if (errorRegister) {
            alert(RegisterErrorMessage)
        } else {
            navigation.navigate("Login")
        }

    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1b4f49" />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView scrollEnabled={isKeyOpen ? true : false} contentContainerStyle={{ height: isKeyOpen ? hp(90) : hp(108) }}>
                    <View style={styles.topContainer}>
                        <LottieView source={require('../../assets/Lottie/cat.json')} autoPlay loop />
                        {/* <Animatable.Text duration={3000} animation={"bounceInLeft"} style={{ fontSize: 28, fontWeight: 'bold', color: colors.text }}>Welcome !</Animatable.Text> */}
                    </View>
                    <Formik
                        initialValues={values}
                        validationSchema={loginValidationSchema}
                        onSubmit={async (values) => {
                            // This will run when the form is submitted
                            await sleep(150)
                            submitRegister(values)
                        }}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <Animatable.View
                                animation={'bounceInUp'}
                                duration={2000}
                                style={{
                                    ...styles.bottomContainer,
                                }}>
                                <Input
                                    ref={firstInput}
                                    returnKeyType="next"
                                    containerStyle={{
                                        marginTop: 15,
                                        //backgroundColor: 'red',
                                    }}
                                    inputContainerStyle={{
                                        borderRadius: 15,
                                        paddingStart: 8,
                                        backgroundColor: 'white',
                                    }}
                                    onSubmitEditing={() => {
                                        secondInput.current.focus()
                                    }}
                                    errorMessage={
                                        errors.email ? `${errors.email}` : null
                                    }
                                    renderErrorMessage={true}
                                    errorStyle={{
                                        color: "red",
                                        fontSize: ratio * 22,
                                        letterSpacing: 1
                                    }}
                                    onChangeText={
                                        handleChange('email')
                                    }
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                    placeholder={'Your email'}
                                    label={'Email'}
                                    labelStyle={{ color: 'white', margin: 6 }}
                                    leftIcon={() => (<Ionicons name='ios-person-outline' size={ratio * 48} color={"black"} />)}
                                />
                                <Input
                                    ref={secondInput}
                                    returnKeyType='next'
                                    containerStyle={{
                                        // marginTop: 15,
                                        // backgroundColor: 'red',
                                    }}
                                    inputContainerStyle={{
                                        borderRadius: 15,
                                        paddingStart: 8,
                                        paddingEnd: 8,
                                        backgroundColor: 'white',
                                    }}
                                    onSubmitEditing={() => {
                                        ThirdInput.current.focus()
                                    }}
                                    errorMessage={
                                        errors.password && `${errors.password}`
                                    }
                                    errorStyle={{
                                        color: "red",
                                        fontSize: ratio * 22,
                                        letterSpacing: 1
                                    }}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    value={values.password}
                                    secureTextEntry={securePassword ? true : false}
                                    placeholder={'Password'}
                                    label={'Password'}
                                    labelStyle={{ color: 'white', margin: 6 }}
                                    leftIcon={() => (<Ionicons name='ios-lock-closed-outline' size={ratio * 50} color={"black"} />)}
                                    rightIcon={() => (
                                        securePassword ?
                                            <Ionicons
                                                name='ios-eye-outline'
                                                size={ratio * 50}
                                                color={"black"}
                                                onPress={() =>
                                                    setSecurePassword(!securePassword)
                                                } /> :
                                            <Ionicons
                                                name='ios-eye-off-outline'
                                                size={ratio * 50}
                                                color={"grey"}
                                                onPress={() =>
                                                    setSecurePassword(!securePassword)
                                                } />
                                    )}
                                />
                                <Input
                                    ref={ThirdInput}
                                    returnKeyType='done'
                                    containerStyle={{
                                        // marginTop: 15,
                                        // backgroundColor: 'red',
                                    }}
                                    inputContainerStyle={{
                                        borderRadius: 15,
                                        paddingStart: 8,
                                        paddingEnd: 8,
                                        backgroundColor: 'white',
                                    }}
                                    errorMessage={
                                        errors.confirmPassword ? `${errors.confirmPassword}` : null
                                    }
                                    errorStyle={{
                                        color: "red",
                                        fontSize: ratio * 22,
                                        letterSpacing: 1
                                    }}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={() => setFieldTouched('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={secondSecurePassword ? true : false}
                                    placeholder={'Confirm password'}
                                    label={'Confirm password'}
                                    labelStyle={{ color: 'white', margin: 6 }}
                                    leftIcon={() => (<Ionicons name='ios-lock-closed-outline' size={ratio * 50} color={"black"} />)}
                                    rightIcon={() => (
                                        secondSecurePassword ?
                                            <Ionicons
                                                name='ios-eye-outline'
                                                size={ratio * 50}
                                                color={"black"}
                                                onPress={() =>
                                                    setSecondSecurePassword(!secondSecurePassword)
                                                } /> :
                                            <Ionicons
                                                name='ios-eye-off-outline'
                                                size={ratio * 50}
                                                color={"grey"}
                                                onPress={() =>
                                                    setSecondSecurePassword(!secondSecurePassword)
                                                } />
                                    )}
                                />
                                {
                                    errorPassword ? (
                                        <Text style={{ letterSpacing: 1, color: 'red', fontSize: ratio * 22, marginStart: 15, marginTop: -20 }}>Password Not much</Text>
                                    ) : null
                                }
                                <TouchableOpacity
                                    disabled={isValid ? false : true}
                                    style={{ ...styles.buttonSignUp, backgroundColor: isValid ? "#c3e3d4" : "grey" }}
                                    onPress={() => {
                                        if (values.confirmPassword === values.password) handleSubmit()
                                        else setErrorPassword(true)
                                    }}
                                >
                                    <Text style={{ color: "black", fontWeight: 'bold', fontSize: 16 }}> Sign Up </Text>
                                </TouchableOpacity>
                                { isRegister ? <Animatable.Text animation={fade} iterationCount='infinite' >Registring ... </Animatable.Text> : null}
                            </Animatable.View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const mapStateToProps = (state) => ({
    isRegister: state.authReducer.isRegister,
    errorRegister: state.authReducer.errorRegister,
    RegisterErrorMessage: state.authReducer.RegisterErrorMessage,
})

const mapDispatchToProps = {
    register,
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
