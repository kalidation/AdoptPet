import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import styles from './styles'
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { ratio } from '../../shared/ratio';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { Keyboard } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { StatusBar } from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from './validationSchema';
import { connect } from 'react-redux';
import { login } from '../../redux/Auth/Auth.Actions';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';



const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const index = (props) => {

    const { navigation, errorLogin, LoginErrorMessage, login, isDarkTheme } = props

    const [securePassword, setSecurePassword] = useState(true)
    const [isKeyOpen, setIsKeyOpen] = useState(false)

    const { colors } = useTheme()

    const fadeAnim = useRef(new Animated.Value(0)).current
    const firstInput = useRef(null);
    const secondInput = useRef(null);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        }
    }, [])

    const values = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const submitLogin = async ({ email, password }) => {
        await login(email, password)
        if (errorLogin) {
            alert(LoginErrorMessage)
        }
    }

    const _keyboardDidShow = () => {
        setIsKeyOpen(true)
    };

    const _keyboardDidHide = () => {
        setIsKeyOpen(false)
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} backgroundColor={isDarkTheme ? "#111" : "rgba(210,210,210,0.3)"} />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView scrollEnabled={isKeyOpen ? true : false} contentContainerStyle={{ height: isKeyOpen ? hp(90) : hp(108) }}>
                    <View style={styles.topContainer}>
                        <LottieView source={require('../../assets/Lottie/catLong.json')} autoPlay loop style={{ marginBottom: hp(5) }} />
                        <Animatable.Text
                            animation={'bounceInLeft'}
                            duration={3000}
                            style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, position: 'absolute', bottom: hp(2), start: hp(2) }}>Welcome !</Animatable.Text>
                    </View>
                    <Formik
                        initialValues={values}
                        validationSchema={loginValidationSchema}
                        onSubmit={async (values) => {
                            // This will run when the form is submitted
                            await sleep(150)
                            submitLogin(values)
                        }}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>
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
                                    errorMessage={
                                        errors.email ? `${errors.email}` : null
                                    }
                                    onSubmitEditing={() => {
                                        secondInput.current.focus()
                                    }}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
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
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    secureTextEntry={securePassword ? true : false}
                                    placeholder={'Your password'}
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
                                <Text style={{ color: "white", marginStart: 15, marginTop: -15 }}>Forget Password ?</Text>
                                <TouchableOpacity style={styles.buttonSplash} onPress={() => handleSubmit()}>
                                    <Text style={{ color: "black", fontSize: 16 }}> Sign In </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.buttonSignUp }} onPress={() => navigation.navigate("Register")}>
                                    <Text style={{ color: "black", fontWeight: 'bold', fontSize: 16 }}> Sign Up </Text>
                                </TouchableOpacity>
                            </Animatable.View>}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    )
}

const mapStateToProps = (state) => ({
    isLogin: state.authReducer.isLogin,
    logged: state.authReducer.logged,
    errorLogin: state.authReducer.errorLogin,
    LoginErrorMessage: state.authReducer.LoginErrorMessage,
    user: state.authReducer.user,
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {
    login,
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
