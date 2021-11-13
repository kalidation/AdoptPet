import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Drawer, Switch } from 'react-native-paper'
import styles from './styles'
import { AntDesign, Feather } from '@expo/vector-icons';
import { ratio } from '../../shared/ratio'
import ProfileComponent from '../../components/ProfileComponent'
import { logOut } from '../../redux/Auth/Auth.Actions'
import { connect } from 'react-redux'
import { setIsDarkTheme } from '../../redux/DarkTheme/DarkTheme.Actions'
import { useTheme } from '@react-navigation/native'
import { firebase } from '../../firebase/Firebase'

const DrawerContent = (props) => {

    const { navigation, errorLogout, errorLogoutMessage, logOut, setIsDarkTheme, isDarkTheme, user } = props
    const { colors } = useTheme();
    const [userProp, setUser] = useState(null)

    useEffect(() => {
        setUser(user)
    }, [])

    // const [isDarkTheme, setIsDarkTheme] = useState(false)
    const toggleTheme = () => {
        setIsDarkTheme()
    }

    const submitLogOut = () => {
        logOut()
        if (errorLogout) {
            alert(errorLogoutMessage)
        }
    }

    return (
        <View style={{ ...styles.container }}>
            <DrawerContentScrollView style={{ ...styles.drawerContent, backgroundColor: isDarkTheme ? 'black' : 'white' }} {...props}>
                <ProfileComponent themeColors={colors.text} user={userProp} />
                <Drawer.Section>
                    <DrawerItem
                        label="Home"
                        labelStyle={{
                            color: colors.text,
                        }}
                        activeTintColor="black"
                        icon={({ color, focused }) =>
                            <AntDesign name="home" size={ratio * 48} color={colors.text} />
                        }
                        onPress={() => navigation.navigate("HomeDrawer")}
                    />
                    <DrawerItem
                        label="Profile"
                        labelStyle={{
                            color: colors.text,
                        }}
                        activeTintColor="black"
                        icon={({ color, focused }) =>
                            <AntDesign name="profile" size={ratio * 48} color={colors.text} />
                        }
                        onPress={() => navigation.navigate("ProfileDrawer")}
                    />
                    <DrawerItem
                        label="Saved"
                        labelStyle={{
                            color: colors.text,
                        }}
                        activeTintColor="black"
                        icon={({ color, focused }) =>
                            <Feather name="bookmark" size={ratio * 48} color={colors.text} />
                        }
                        onPress={() => navigation.navigate("Saved")}
                    />
                    <DrawerItem
                        label="Contact"
                        labelStyle={{
                            color: colors.text,
                        }}
                        activeTintColor="black"
                        icon={({ color, focused }) =>
                            <AntDesign name="contacts" size={ratio * 48} color={colors.text} />
                        }
                    />
                </Drawer.Section>
                <Drawer.Section title={"Preferences"}>
                    <TouchableOpacity onPress={() => toggleTheme()}>
                        <View style={styles.prefer}>
                            <Text style={{ color: colors.text }}>{isDarkTheme ? <Text>Dark Theme</Text> : <Text>Light Theme</Text>}</Text>
                            <View pointerEvents={'none'} >
                                <Switch value={isDarkTheme} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.drawerBottomSection}>
                <DrawerItem
                    label="Sign Out"
                    onPress={() => submitLogOut()}
                    labelStyle={{
                        color: colors.text,
                        fontWeight: 'bold'
                    }}
                    icon={({ color, focused }) =>
                        <AntDesign name="logout" size={ratio * 48} color={colors.text} />
                    }
                />
            </Drawer.Section>
        </View>
    )
}

const mapStateToProps = (state) => ({
    isLogOut: state.authReducer.isLogOut,
    errorLogout: state.authReducer.errorLogout,
    errorLogoutMessage: state.authReducer.errorLogoutMessage,
    user: state.authReducer.user,
    isDarkTheme: state.darkThemeReducer.isDarkTheme,
})

const mapDispatchToProps = {
    logOut,
    setIsDarkTheme,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
