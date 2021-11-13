import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from '../Tabs/MainTab';
import DrawerContent from './DrawerContent';
import ProfileStack from '../Stacks/ProfileStack';
import SavedPetStack from "../../routes/Stacks/SavedPetStack"
import ExplorerStack from '../Stacks/ExplorerStack';


const Drawer = createDrawerNavigator()

const AppDrawer = ({ location }) => {
    return (
        <Drawer.Navigator drawerType='slide' drawerContent={
            (props) => <DrawerContent {...props} />
        }
        >
            <Drawer.Screen name="HomeDrawer"   >
                {(props) => <MainTab location={location} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="ProfileDrawer"  >
                {(props) => <ProfileStack location={location} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="Saved"  >
                {(props) => <SavedPetStack location={location} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="Explorer"  >
                {(props) => <ExplorerStack location={location} {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default AppDrawer
