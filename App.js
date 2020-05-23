import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { StyleSheet, Text, View } from 'react-native';
//import Routes from './src/routes'
import Inicial_page from './src/index'
import 'react-native-gesture-handler';
import './src/config/ReactotronConfig';
import {store, persistor} from './src/store'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <Inicial_page />
      </PersistGate>
    
    </Provider>
     
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
