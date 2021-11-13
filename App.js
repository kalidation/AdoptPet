import React, { useState, useEffect, useContext } from 'react';
import RoutesProviders from './routes/index';
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store'
import { Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { View, LogBox } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';


LogBox.ignoreLogs(["Setting a timer"]);

const { store, persistor } = configureStore();

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // < LottieView source = { require('./animation.json') } autoPlay loop />

  useEffect(() => {
    //getLocation()
    setTimeout(async () => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    // <RoutesProviders />
    // <SplashScreen />
    // <LoginScreen />
    //<RegisterScreen />

    isLoading ?
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {<LottieView source={require('./assets/Lottie/animal-care-loading.json')} style={{ width: heightPercentageToDP(60), height: heightPercentageToDP(60) }} autoPlay loop />}
      </View>
      :
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <RoutesProviders />
        </PersistGate>
      </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
